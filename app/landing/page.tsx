'use client';
import * as React from 'react';
import {Box, CircularProgress, Grid, Stack} from '@mui/material';
import AllTripsCard from '../components/cards/all/all-trips-card';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AllTripsCardType } from '../types/card-types';

export default function Landing() {
	const {data, error, isLoading} = useQuery<AllTripsCardType[]>({
		queryKey: ['getAllTrips'],
		queryFn: async () => (await fetch('https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels')).json(),
	});

	//TODO handle error in providers

	if(isLoading) {
		return < CircularProgress size={20} />
	}

	return data && (
		<Box
			height="80%"
			width="100%"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			p={3}
		>      
			<Grid
				container
				component="main"
				gap="24px"
				columns={12}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					// height: '100%',
					overflow: 'hidden',
					maxWidth: '100%',
					alignItems: 'center'
				}}
				>
				{data.map(({id, title, description, photo_url}) => 
					<AllTripsCard key={id + title} title={title} description={description} photo_url={photo_url}/>)}
			</Grid>
		</Box>
	);
}