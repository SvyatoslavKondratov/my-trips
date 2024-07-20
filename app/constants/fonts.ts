import type {TypographyOptions} from '@mui/material/styles/createTypography';
import localFont from 'next/font/local';

const defaultFont = localFont({
	src: [
		{
			path: '../../public/fonts/oakes-grotesk-regular.woff2',
			weight: '400',
			style: 'normal',
		},
	],
});

export const typographyStyles: TypographyOptions = {
	fontFamily: defaultFont.style.fontFamily,
	h3: {
		fontSize: '1.852vmax',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '2.315vmax',
		letterSpacing: '-1%',
	},
	h5: {
		fontSize: '1.157vmax',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '1.447vmax',
	},
	subtitle1: {
		fontSize: '0.926vmax',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '1.389vmax',
	},
	subtitle2: {
		fontSize: '0.926vmax',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '1.389vmax',
	},
	body2: {
		fontSize: '0.926vmax',
		fontStyle: 'normal',
		lineHeight: '1.389vmax',
		fontWeight: 400,
		color: 'gray',
	},
};
