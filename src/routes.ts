export const routeLoaders = {
 '/nosotros': () => import('./pages/About'),
 '/proyectos': () => import('./pages/SocialPrograms'),
 '/servicios-tech': () => import('./pages/TechServices'),
 '/donar': () => import('./pages/GetInvolved'),
 '/voluntariado': () => import('./pages/GetInvolved'),
 '/contacto': () => import('./pages/Contact'),
 '/privacidad': () => import('./pages/PrivacyPolicy'),
 '/terminos': () => import('./pages/TermsOfUse'),
 '/impacto': () => import('./pages/Impact'),
 '/recursos': () => import('./pages/Resources'),
 '/gracias': () => import('./pages/Success'),
};

export async function prepareRoute(pathname: string){
 const path=pathname.replace(/\/$/,'') || '/';
 const load=routeLoaders[path as keyof typeof routeLoaders];
 if(load)await load();
}
