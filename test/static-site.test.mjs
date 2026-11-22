import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {brotliCompressSync,gzipSync} from 'node:zlib';
import {createStaticSite,acceptedEncodings} from '../server/static-site.mjs';
import {requestLanguage} from '../server/site-config.mjs';

test('language precedence and accepted compression respect explicit choices',()=>{
 assert.equal(requestLanguage({search:'?lng=de',cookie:'i18next=fr',acceptLanguage:'en'}),'de');
 assert.equal(requestLanguage({cookie:'other=1; i18next=fr-FR',acceptLanguage:'es'}),'fr');
 assert.equal(requestLanguage({acceptLanguage:'fr;q=0.2,en;q=0.9'}),'en');
 assert.equal(requestLanguage({cookie:'i18next=%broken',acceptLanguage:'unknown'}),'es');
 assert.deepEqual(acceptedEncodings('gzip;q=1, br;q=0.5'),['gzip','br']);
 assert.deepEqual(acceptedEncodings('br;q=0, gzip;q=0'),[]);
});

test('readable localized HTML, compression, conditional requests and missing assets',async t=>{
 const root=await mkdtemp(join(tmpdir(),'samval-static-test-'));
 await mkdir(join(root,'prerender/fr'),{recursive:true});await mkdir(join(root,'assets'));
 const french='<html lang="fr"><h1>Fondation Samval</h1></html>';
 await writeFile(join(root,'index.html'),'<html><div id="root"></div></html>');
 await writeFile(join(root,'prerender/fr/index.html'),french);
 await writeFile(join(root,'prerender/fr/index.html.br'),brotliCompressSync(french));
 await writeFile(join(root,'prerender/fr/index.html.gz'),gzipSync(french));
 await writeFile(join(root,'assets/site.js'),'console.log("ok")');
 const handler=createStaticSite(root),server=createServer((req,res)=>handler(req,res,new URL(req.url,'http://localhost')).catch(()=>{res.writeHead(500);res.end();}));
 server.listen(0,'127.0.0.1');await once(server,'listening');
 t.after(async()=>{await new Promise(resolve=>server.close(resolve));await rm(root,{recursive:true,force:true});});
 const url='http://127.0.0.1:'+server.address().port;
 const response=await fetch(url+'/?lng=fr',{headers:{'accept-encoding':'br'}});
 assert.equal(response.headers.get('content-language'),'fr');assert.equal(response.headers.get('content-encoding'),'br');assert.match(response.headers.get('vary'),/Cookie/);assert.equal(await response.text(),french);
 const etag=response.headers.get('etag');
 const cached=await fetch(url+'/?lng=fr',{headers:{'accept-encoding':'br','if-none-match':etag}});assert.equal(cached.status,304);assert.equal(await cached.text(),'');
 const identity=await fetch(url+'/?lng=fr',{headers:{'accept-encoding':'br;q=0,gzip;q=0'}});assert.equal(identity.headers.get('content-encoding'),null);assert.equal(await identity.text(),french);
 const head=await fetch(url+'/?lng=fr',{method:'HEAD',headers:{'accept-encoding':'identity'}});assert.equal(Number(head.headers.get('content-length')),Buffer.byteLength(french));assert.equal((await head.arrayBuffer()).byteLength,0);
 const asset=await fetch(url+'/assets/site.js');assert.match(asset.headers.get('cache-control'),/immutable/);
 assert.equal((await fetch(url+'/assets/missing.js')).status,404);
 assert.equal((await fetch(url+'/..%2Fprivate.txt')).status,403);
 assert.equal((await fetch(url+'/%invalid')).status,400);
});
