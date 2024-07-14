import { createTheme } from "@mui/material";
import { typographyStyles } from "../constants/fonts";

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
	},
	typography: {...typographyStyles},
});