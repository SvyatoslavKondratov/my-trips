/* eslint-disable n/file-extension-in-import */
import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import React, {useState} from 'react';
import {type FieldError} from 'react-hook-form';
import {type Itinerary} from '../../types/card-types';

type ItineraryType = {
	value?: Itinerary;
	onChange: (day: number) => void;
	name: string;
	hasError: boolean;
};

export function ItineraryItem({
	value,
	onChange,
	hasError,
	name,
}: ItineraryType) {
	return (
		<FormControl error={hasError}>
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
						value={value?.day}
						InputProps={{sx: {borderRadius: 10, backgroundColor: 'white'}}}
						label="Day"
					>
						<MenuItem value={value?.day}>{value?.day}</MenuItem>
					</TextField>
				</Grid>
				<Grid container item flexDirection="column" md={10} gap={2}>
					<TextField
						InputProps={{sx: {borderRadius: 15, backgroundColor: 'white'}}}
						label="Location"
						placeholder="Location"
						value={value?.location}
					/>
					<TextField
						// Multiline
						id="itinerary-description"
						label="Description"
						placeholder="Description"
						value={value?.description}
						InputProps={{sx: {borderRadius: 5, backgroundColor: 'white'}}}
					/>
				</Grid>
			</Grid>
		</FormControl>
	);
}
