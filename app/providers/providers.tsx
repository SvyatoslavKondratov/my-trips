import React, {type ReactNode} from 'react';
import ReactQueryClientProvider from './react-query-provider';
import ThemeRegistry from '../theme/ThemeRegistry';

export function Providers({children}: {readonly children: ReactNode}) {
	return (
        <ThemeRegistry>
            <ReactQueryClientProvider>
                {children}
            </ReactQueryClientProvider>
        </ThemeRegistry>
    )
    
}
