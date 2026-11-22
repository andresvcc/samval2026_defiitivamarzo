import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {publicRoutes,requestLanguage,snapshotName} from './site-config.mjs';

const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.ico':'image/x-icon','.woff2':'font/woff2','.woff':'font/woff','.txt':'text/plain; charset=utf-8'};
const fileStat=async file=>{try{const s=await fs.stat(file);return s.isFile()?s:null;}catch{return null;}};

export function acceptedEncodings(header=''){
 const weights=new Map(String(header).split(',').map(part=>{const [name,...parameters]=part.trim().split(';');const q=parameters.find(p=>p.trim().startsWith('q='));return [name.trim().toLowerCase(),q?Number(q.trim().slice(2)):1];}));
 return ['br','gzip'].map((name,index)=>({name,index,q:weights.get(name)??weights.get('*')??0}))
  .filter(e=>Number.isFinite(e.q)&&e.q>0).sort((a,b)=>b.q-a.q||a.index-b.index).map(e=>e.name);
}

export function createStaticSite(directory){
 const root=path.resolve(directory);
 return async function serveStatic(req,res,requestUrl){
  let pathname;try{pathname=decodeURIComponent(requestUrl.pathname);}catch{res.writeHead(400);res.end();return;}
  const route=pathname==='/'?'/':pathname.replace(/\/$/,'');
  let file=path.resolve(root,'.'+pathname);
  if(pathname.includes('\0')||(file!==root&&!file.startsWith(root+path.sep))){res.writeHead(403);res.end();return;}
  const language=requestLanguage({search:requestUrl.search,cookie:req.headers.cookie,acceptLanguage:req.headers['accept-language']});
  if(publicRoutes.includes(route)||pathname==='/index.html'){
   const snapshot=path.join(root,'prerender',language,snapshotName(pathname==='/index.html'?'/':route));
   file=await fileStat(snapshot)?snapshot:path.join(root,'index.html');
  }else if(!path.extname(pathname))file=path.join(root,'index.html');
  const original=await fileStat(file);
  if(!original){res.writeHead(404,{'cache-control':'no-store'});res.end('Not found');return;}
  const extension=path.extname(file),html=extension==='.html';
  let encoding=null,selected=original,variant=file;
  for(const candidate of acceptedEncodings(req.headers['accept-encoding'])){
   const encoded=file+(candidate==='br'?'.br':'.gz'),s=await fileStat(encoded);
   if(s){encoding=candidate;variant=encoded;selected=s;break;}
  }
  const etag='"'+createHash('sha256').update(variant+':'+selected.size+':'+selected.mtimeMs).digest('hex').slice(0,24)+'"';
  const versioned=pathname.startsWith('/assets/')||/-[a-f0-9]{12}\.(?:webp|woff2|png)$/.test(pathname);
  const headers={'content-type':types[extension]??'application/octet-stream','cache-control':html?'no-cache':versioned?'public, max-age=31536000, immutable':'public, max-age=3600',etag,
   vary:html?'Accept-Encoding, Accept-Language, Cookie, Origin':'Accept-Encoding, Origin','x-content-type-options':'nosniff'};
  if(encoding)headers['content-encoding']=encoding;
  if(html)headers['content-language']=language;
  if(String(req.headers['if-none-match']??'').split(/,\s*/).some(value=>value===etag||value==='W/'+etag||value==='*')){res.writeHead(304,headers);res.end();return;}
  headers['content-length']=selected.size;
  res.writeHead(200,headers);
  res.end(req.method==='HEAD'?undefined:await fs.readFile(variant));
 };
}
