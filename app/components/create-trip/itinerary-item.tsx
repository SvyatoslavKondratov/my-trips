/* eslint-disable n/file-extension-in-import */
import {
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import React, {useState} from 'react';
import {type Itinerary} from '../../types/card-types';

type ItineraryType = {
	itinerary?: Itinerary;
};

export function ItineraryItem({itinerary}: ItineraryType) {
	const [value, setValue] = useState<string | number | undefined>();

	return (
		<Grid
			container
			item
			p={2}
			sx={{backgroundColor: '#F3F3F3'}}
			columns={12}
			justifyContent="space-between"
		>
			<Grid container item flexDirection="column" md={1.5}>
				<TextField
					select
					id="demo-simple-select"
					value={value}
					defaultValue={itinerary?.day}
					InputProps={{sx: {borderRadius: 10, backgroundColor: 'white'}}}
					label="Day"
					onChange={(e) => {
						setValue(e.target.value);
					}}
				>
					<MenuItem value={itinerary?.day}>{itinerary?.day}</MenuItem>
				</TextField>
			</Grid>
			<Grid container item flexDirection="column" md={10} gap={2}>
				<TextField
					InputProps={{sx: {borderRadius: 15, backgroundColor: 'white'}}}
					label="Location"
					placeholder="Location"
					defaultValue={itinerary?.location}
				/>
				<TextField
					multiline
					label="Description"
					placeholder="Description"
					defaultValue={itinerary?.description}
					InputProps={{sx: {borderRadius: 5, backgroundColor: 'white'}}}
				/>
			</Grid>
		</Grid>
	);
}
