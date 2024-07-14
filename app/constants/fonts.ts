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
	h1: {
		fontSize: '80px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '140%',
		letterSpacing: '-1.2px',
	},
	h2: {
		fontSize: '60px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '120%',
		letterSpacing: '-0.9px',
	},
	h3: {
		fontSize: '48px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '166%',
		letterSpacing: '-0.096px',
	},
	h4: {
		fontSize: '34px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '124%',
		letterSpacing: '0.085px',
	},
	h5: {
		fontSize: '24px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '132%',
		letterSpacing: '0.12px',
	},
	h6: {
		fontSize: '20px',
		fontStyle: 'normal',
		fontWeight: 500,
		lineHeight: '160%',
		letterSpacing: '0.26px',
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
		fontWeight: 500,
		lineHeight: '156%',
		letterSpacing: '0.42px',
	},
	body1: {
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '148%',
		letterSpacing: '0.32px',
	},
	body2: {
		fontSize: '14px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '140%',
		letterSpacing: '0.28px',
	},
	caption: {
		fontSize: '12px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '164%',
		letterSpacing: '0.36px',
	},
	overline: {
		fontSize: '12px',
		fontStyle: 'normal',
		fontWeight: 400,
		lineHeight: '31px',
		letterSpacing: '264%',
		textTransform: 'uppercase',
	},
};
