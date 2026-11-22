import { useEffect, useState } from 'react';

// Keep prerendered form controls disabled until their validation and submission
// handlers are attached. Typing before hydration would bypass React form state.
export function useClientReady(){
 const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 return ready;
}
