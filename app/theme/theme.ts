import {createTheme} from '@mui/material';
// eslint-disable-next-line n/file-extension-in-import
import {textFieldStyles, typographyStyles} from '../constants/fonts';

const primary = {
	main: '#3f50b5',
	light: '#42a5f5',
	dark: '#1565c0',
	contrastText: '#fff',
};

const secondary = {
	light: '#ff7961',
	main: '#000',
	dark: '#ba000d',
	contrastText: '#000',
	success: '#F3F3F3',
};

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary,
		secondary,
	},
	typography: {...typographyStyles},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-root, & .MuiInputLabel-root, &.MuiTextField-root': {
						...textFieldStyles,
					},
				},
			},
		},
	},
});
