import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languageCode, requestLanguage } from '../server/site-config.mjs';

const dictionaries = {
 es: () => import('./locales/es.json'),
 en: () => import('./locales/en.json'),
 fr: () => import('./locales/fr.json'),
 de: () => import('./locales/de.json'),
};

i18n.use({
 type: 'backend' as const,
 init() {},
 read(language: string, _namespace: string, callback: (error: unknown, data: unknown) => void) {
  const load=dictionaries[languageCode(language) as keyof typeof dictionaries] ?? dictionaries.es;
  load().then(module=>callback(null,module.default),error=>callback(error,null));
 },
}).use(initReactI18next);

i18n.on('languageChanged', language => {
 if(typeof document==='undefined')return;
 const code=languageCode(language)??'es';
 document.documentElement.lang=code;
 document.cookie=`i18next=${code}; Path=/; Max-Age=31536000; SameSite=Lax`;
 try{window.localStorage.setItem('i18nextLng',code);}catch{}
});

export async function initializeI18n(language?: string){
 const selected=language ?? (document.getElementById('root')?.dataset.prerendered==='true'
  ? document.documentElement.lang
  : requestLanguage({search:window.location.search,cookie:document.cookie,acceptLanguage:navigator.language}));
 if(i18n.isInitialized)await i18n.changeLanguage(selected);
 else await i18n.init({lng:selected,supportedLngs:['es','en','fr','de'],fallbackLng:'es',load:'languageOnly',interpolation:{escapeValue:false}});
 if(!i18n.hasResourceBundle(selected,'translation')||!i18n.hasResourceBundle('es','translation'))throw new Error('Language download unavailable');
 return i18n;
}

export async function changeSiteLanguage(language: string){
 try{
  await i18n.loadLanguages(language);
  if(i18n.hasResourceBundle(language,'translation'))await i18n.changeLanguage(language);
 }catch{ /* Keep the readable current language when the connection fails. */ }
}

export default i18n;
