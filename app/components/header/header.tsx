import {AppBar, Grid, Toolbar, Typography} from '@mui/material';

export default function Header() {
	return (
		<AppBar
			component="nav"
			sx={{
				alignItems: 'center',
				position: 'sticky',
				backgroundColor: '#FFF',
			}}
		>
			<Toolbar>
				<Grid container justifyContent="center" m={1}>
					<Typography variant="h5" mb={2} color="black">
						The places you dream of
					</Typography>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}
