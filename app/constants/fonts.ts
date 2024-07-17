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
		fontSize: '48px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '166%',
		letterSpacing: '-0.096px',
	},
	h5: {
		fontSize: '24px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '132%',
		letterSpacing: '0.12px',
	},	
	subtitle1: {
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '178%',
		letterSpacing: '0.4px',
	},
	subtitle2: {
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '140%',
		letterSpacing: '0.28px',
	},
	body2: {
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: 400,
		color: 'gray',
	},
};
