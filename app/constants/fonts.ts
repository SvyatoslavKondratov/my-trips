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
		fontSize: '2.865vmin',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '3.581vmin',
		letterSpacing: '-1%',
	},
	h5: {
		fontSize: '1.791vmin',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '2.238vmin',
	},
	subtitle1: {
		fontSize: '1.253vmin',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '2.149vmin',
	},
	subtitle2: {
		fontSize: '1.253vmin',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '2.149vmin',
	},
	body2: {
		fontSize: '1.253vmin',
		fontStyle: 'normal',
		lineHeight: '2.149vmin',
		fontWeight: 400,
		color: 'gray',
	},
};
