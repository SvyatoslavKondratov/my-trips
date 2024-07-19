'use client';

import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// eslint-disable-next-line n/file-extension-in-import
import {lightTheme} from './theme';

export default function ThemeRegistry({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
