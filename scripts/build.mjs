import {build} from 'vite';
import {readFile,writeFile,mkdir,readdir,rm,stat} from 'node:fs/promises';
import {resolve,join,dirname} from 'node:path';
import {brotliCompressSync,gzipSync,constants} from 'node:zlib';
import {pathToFileURL} from 'node:url';
import {languages,publicRoutes,snapshotName} from '../server/site-config.mjs';

await build({build:{manifest:true}});
const temporary='.prerender-build';
try{
 await build({build:{ssr:'src/entry-server.tsx',outDir:temporary,emptyOutDir:true,manifest:false}});
 const {render}=await import(pathToFileURL(resolve(temporary,'entry-server.js')));
 let template=await readFile('dist/index.html','utf8');
 template=template.replace(/<script type="module"/g,'<script data-cfasync="false" type="module"');
 if(!template.includes('<!--app-html-->'))throw Error('Prerender outlet missing');
 await writeFile('dist/index.html',template);
 const clientManifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));
 const css=await Promise.all((clientManifest['index.html'].css??[]).map(file=>readFile('dist/'+file,'utf8')));
 const readableTemplate=template.replace(/<link rel="stylesheet"[^>]*>/g,'')
  .replace('</head>',()=>'<style data-samval-critical>'+css.join('\n').replaceAll('</style','<\\/style')+'</style></head>');
 const escape=text=>String(text??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 for(const language of languages){
  await mkdir('dist/prerender/'+language,{recursive:true});
  for(const pathname of publicRoutes){
   const result=await render(pathname,language);
   if(!result.html.includes('<h1'))throw Error('Missing readable page: '+pathname+'/'+language);
   const html=readableTemplate.replace('<html lang="es">',`<html lang="${language}">`)
    .replace('<div id="root">','<div id="root" data-prerendered="true">')
    .replace('<!--app-html-->',()=>result.html)
    .replace(/<title>.*?<\/title>/,()=>`<title>${escape(result.title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*/,(_match,prefix)=>prefix+escape(result.description))
    .replace(/(<meta property="og:title"\s+content=")[^"]*/,(_match,prefix)=>prefix+escape(result.title))
    .replace(/(<meta property="og:description"\s+content=")[^"]*/,(_match,prefix)=>prefix+escape(result.description));
   const target='dist/prerender/'+language+'/'+snapshotName(pathname);
   await mkdir(dirname(target),{recursive:true});await writeFile(target,html);
  }
 }
}finally{await rm(temporary,{recursive:true,force:true});}

const files=[];
async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){const p=join(path,entry.name);if(entry.isDirectory())await walk(p);else files.push(p);}}
await walk('dist');
for(const file of files){
 if(!/\.(html|css|js|json|svg)$/.test(file))continue;
 const bytes=await readFile(file);if(bytes.length<512)continue;
 await writeFile(file+'.br',brotliCompressSync(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:11}}));
 await writeFile(file+'.gz',gzipSync(bytes,{level:9}));
}
const manifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));
const entry=manifest['index.html'];if(!entry)throw Error('Client entry missing');
const initial=new Set();
const collect=(item,files)=>{files.add(item.file);for(const name of item.imports??[])collect(manifest[name],files);};collect(entry,initial);
let initialBytes=0;
for(const language of languages){
 const files=new Set(initial);
 for(const code of new Set(['es',language]))collect(manifest[`src/locales/${code}.json`],files);
 let bytes=0;for(const file of files)bytes+=(await stat('dist/'+file+'.br')).size;
 initialBytes=Math.max(initialBytes,bytes);
}
if(initialBytes>120*1024)throw Error(`Initial JavaScript budget exceeded: ${initialBytes} bytes (max 120 KiB Brotli)`);
const home=(await stat('dist/prerender/es/index.html.br')).size;
if(home>20*1024)throw Error(`Home HTML budget exceeded: ${home} bytes (max 20 KiB Brotli)`);
console.log(`Prepared ${publicRoutes.length*languages.length} readable pages; initial JavaScript ${(initialBytes/1024).toFixed(1)} KiB, home HTML ${(home/1024).toFixed(1)} KiB (Brotli).`);
