/* eslint-disable n/file-extension-in-import */
import React, {type ReactNode} from 'react';
import ThemeRegistry from '../theme/ThemeRegistry';
import ReactQueryClientProvider from './react-query-provider';

export function Providers({children}: {readonly children: ReactNode}) {
	return (
		<ThemeRegistry>
			<ReactQueryClientProvider>{children}</ReactQueryClientProvider>
		</ThemeRegistry>
	);
}
