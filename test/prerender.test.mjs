import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {languages,publicRoutes,snapshotName} from '../server/site-config.mjs';

test('every public page and language has useful HTML before JavaScript',async()=>{
 for(const language of languages)for(const route of publicRoutes){
  const html=await readFile('dist/prerender/'+language+'/'+snapshotName(route),'utf8');
  assert.ok(html.includes(`<html lang="${language}">`),route+' language');
  assert.match(html,/<h1\b[^>]*>[^<\s]/,route+' heading');
  assert.match(html,/data-prerendered="true"/);
  assert.match(html,/<style data-samval-critical>/);
  assert.doesNotMatch(html,/<link rel="stylesheet"/);
  assert.match(html,/<script data-cfasync="false" type="module"/);
  assert.doesNotMatch(html,/src="https:\/\/(?:i\.ibb\.co|fonts\.googleapis|www\.googletagmanager)/);
  assert.doesNotMatch(html,/<link[^>]+href="https:\/\/fonts\.googleapis/);
 }
});

test('home remains within the HTML and mobile image transfer budgets',async()=>{
 const source=await readFile('src/generated/media.ts','utf8');
 const media=JSON.parse(source.slice(source.indexOf('{'),source.lastIndexOf('}')+1));
 assert.ok((await stat('dist/prerender/es/index.html.br')).size<20*1024);
 assert.ok((await stat('public'+media.heroMobile)).size<70*1024);
 assert.ok((await stat('public'+media.logo)).size<5*1024);
});
