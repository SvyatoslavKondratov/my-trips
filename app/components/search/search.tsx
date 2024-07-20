import {
	Button,
	Grid,
	InputAdornment,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material';
import * as React from 'react';
import {useState} from 'react';
import {useSearch} from '@/app/hooks/useSearch';

export function Search() {
	const {search} = useSearch();
	const [searchQuery, setSearchQuery] = useState<string>('');
	return (
		<Grid container flexDirection="column" alignItems="center" mb={4}>
			<Typography variant="h3">The places you dream of</Typography>
			<Typography variant="h5">Let’s live new adventures</Typography>
			<OutlinedInput
				placeholder="Search trips"
				sx={{borderRadius: 10, marginTop: 2}}
				endAdornment={
					<InputAdornment position="end">
						<Button
							variant="contained"
							sx={{
								backgroundColor: 'black',
								borderRadius: 10,
								textTransform: 'none',
							}}
							onClick={() => {
								if (searchQuery.length > 2) {
									search(searchQuery);
								}
							}}
						>
							Search
						</Button>
					</InputAdornment>
				}
				value={searchQuery}
				onChange={(event) => {
					setSearchQuery(event.target.value);
				}}
			/>
		</Grid>
	);
}
