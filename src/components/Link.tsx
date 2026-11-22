import React from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';

// Each destination already has readable HTML. Native document navigation keeps
// it usable even when the next page's interactive chunk cannot be downloaded.
export function Link(props: LinkProps){
 return <RouterLink {...props} reloadDocument />;
}
