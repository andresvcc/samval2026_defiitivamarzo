export const languages = ['es', 'en', 'fr', 'de'];
export const publicRoutes = ['/', '/nosotros', '/proyectos', '/servicios-tech', '/donar', '/voluntariado', '/contacto', '/impacto', '/recursos', '/privacidad', '/terminos'];
export const languageCode = value => {
 const code=String(value??'').toLowerCase().split('-')[0];
 return languages.includes(code)?code:null;
};
export function requestLanguage({search='',cookie='',acceptLanguage=''}={}){
 const query=languageCode(new URLSearchParams(search).get('lng'));if(query)return query;
 const saved=/(?:^|;\s*)i18next=([^;]*)/.exec(cookie)?.[1];
 if(saved){try{const code=languageCode(decodeURIComponent(saved));if(code)return code;}catch{}}
 const accepted=acceptLanguage.split(',').map((part,index)=>{const [value,quality]=part.trim().split(';');return {code:languageCode(value),quality:quality?Number(quality.replace('q=','')):1,index};})
  .filter(item=>item.code&&item.quality>0).sort((a,b)=>b.quality-a.quality||a.index-b.index);
 return accepted[0]?.code??'es';
}
export const snapshotName = pathname => pathname==='/'?'index.html':pathname.slice(1)+'.html';
