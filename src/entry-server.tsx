import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { initializeI18n } from './i18n';
import { SeoMetadataContext } from './components/SEO';

export async function render(pathname: string, language: string){
 await initializeI18n(language);
 const metadata:{title?:string;description?:string}={};
 const html=await new Promise<string>((resolve,reject)=>{
  const output=new PassThrough();let html='';
  output.on('data',chunk=>html+=chunk.toString());output.on('end',()=>resolve(html));output.on('error',reject);
  const stream=renderToPipeableStream(<StaticRouter location={pathname}><SeoMetadataContext.Provider value={metadata}><App /></SeoMetadataContext.Provider></StaticRouter>,{
   onAllReady(){stream.pipe(output);},onError(error){reject(error);},
  });
 });
 return {html,...metadata};
}
