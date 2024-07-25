/* eslint-disable n/file-extension-in-import */
import {
	FormControl,
	FormHelperText,
	Grid,
	MenuItem,
	TextField,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import React from 'react';
import {type FieldError} from 'react-hook-form';
import * as R from 'rambda';
import {type Itinerary} from '../../types/card-types';

export type ItineraryError = {
	description?: FieldError;
	location?: FieldError;
	day?: FieldError;
};

type ItineraryFormType = {
	value?: Partial<Itinerary>;
	onChange: (data: Partial<Itinerary>) => void;
	hasError: boolean;
	error?: ItineraryError;
	onBlur: () => void;
};

export function ItineraryItem({
	value,
	onChange,
	hasError,
	error,
	onBlur,
}: ItineraryFormType) {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));
	let errorMessage = '';
	const errorKeys = error ? R.keys(error) : [];

	if (error && errorKeys.length > 0) {
		for (const key of errorKeys) {
			const message = error[key]?.message;
			if (message) {
				errorMessage = errorMessage.concat(key, ': ', message, ' ');
			}
		}
	}

	return (
		<FormControl error={hasError}>
			{hasError && error && (
				<FormHelperText id="my-helper-text" sx={{textTransform: 'capitalize'}}>
					{errorMessage}
				</FormHelperText>
			)}
			<Grid
				container
				item
				p={2}
				sx={{backgroundColor: '#F3F3F3'}}
				columns={12}
				justifyContent="space-between"
				flexDirection={isXs ? 'column' : 'row'}
				gap={isXs ? 2 : 0}
			>
				<Grid container item flexDirection="column" md={1.5} sm={1.5}>
					<TextField
						select
						size={isXs ? 'small' : 'medium'}
						id="demo-simple-select"
						value={value?.day}
						InputProps={{sx: {borderRadius: 10, backgroundColor: 'white'}}}
						label="Day"
						onChange={(e) => {
							onChange({...value, day: Number(e.target.value)});
						}}
						onBlur={onBlur}
					>
						<MenuItem value={value?.day}>{value?.day}</MenuItem>
					</TextField>
				</Grid>
				<Grid container item flexDirection="column" md={10} gap={2} sm={10}>
					<TextField
						size={isXs ? 'small' : 'medium'}
						InputProps={{sx: {borderRadius: 15, backgroundColor: 'white'}}}
						label="Location"
						placeholder="Location"
						value={value?.location}
						onChange={(e) => {
							onChange({...value, location: e.target.value});
						}}
						onBlur={onBlur}
					/>
					<TextField
						multiline
						size={isXs ? 'small' : 'medium'}
						id="itinerary-description"
						label="Description"
						placeholder="Description"
						value={value?.description}
						InputProps={{sx: {borderRadius: 5, backgroundColor: 'white'}}}
						onChange={(e) => {
							onChange({...value, description: e.target.value});
						}}
						onBlur={onBlur}
					/>
				</Grid>
			</Grid>
		</FormControl>
	);
}
