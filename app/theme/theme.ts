import {createTheme} from '@mui/material';
// eslint-disable-next-line n/file-extension-in-import
import {typographyStyles} from '../constants/fonts';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
	typography: {...typographyStyles},
});
