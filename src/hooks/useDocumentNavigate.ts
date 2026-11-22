import {useCallback} from 'react';

export function useDocumentNavigate(){
 return useCallback((to: string)=>window.location.assign(to),[]);
}
