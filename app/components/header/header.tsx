import {
	AppBar,
	Box,
	Button,
	Grid,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import ExoticcaLogo from '@/app/svgs/Vector';

export default function Header() {
	return (
		<Grid container justifyContent="center" mt={2} mb={2}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: 'black',
					width: '90%',
					borderRadius: 3,
					paddingTop: 1,
					paddingBottom: 1,
				}}
			>
				<Toolbar>
					<IconButton
						sx={{
							ml: 0,
							backgroundColor: 'white',
							padding: '12px 9.5px',
						}}
					>
						<ExoticcaLogo />
					</IconButton>
					<Button
						variant="outlined"
						sx={{
							backgroundColor: 'white',
							color: 'black',
							borderRadius: 5,
							position: 'absolute',
							right: 16,
							textTransform: 'none',
						}}
					>
						Create new trip
					</Button>
				</Toolbar>
			</AppBar>
		</Grid>
	);
}
