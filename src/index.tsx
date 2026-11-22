import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeI18n } from './i18n';
import {prepareRoute} from './routes';
import App from './App';
import { initializeAnalytics } from './utils/analytics';

async function start(){
 await Promise.all([initializeI18n(),prepareRoute(window.location.pathname)]);
 initializeAnalytics();
 const rootElement=document.getElementById('root');
 if(!rootElement)throw new Error('Could not find root element to mount to');
 const app=<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>;
 if(rootElement.dataset.prerendered==='true')ReactDOM.hydrateRoot(rootElement,app);
 else ReactDOM.createRoot(rootElement).render(app);
}
start().catch(error=>console.error('Unable to activate interactive controls',error));
