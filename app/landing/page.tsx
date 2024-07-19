'use client';
import * as React from 'react';
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import AllTripsCard from '../components/cards/all/all-trips-card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AllTripsCardType, CardStatus } from '../types/card-types';
import { TripDetails } from '../components/trip-details/trip-details';
import { useState, useEffect } from 'react';
import NavigationButtons from '../components/buttons/navigation-buttons/navigation-buttons';
import { useDeleteTripMutation } from '../hooks/useDeleteTripMutation';


export default function Landing() {
	const {data = [], error, isLoading} = useQuery<AllTripsCardType[]>({queryKey: ['getAllTrips']});
	
	const queryClient = useQueryClient();

    //TODO use hooks!
    const mutation = useDeleteTripMutation();

	const [openTripId, setOpenTripId] = useState<string|undefined>();
	const [filteredData, setFilteredData] = useState<AllTripsCardType[]>(data);

	useEffect(() => {
		if(data.length === 0) {
			queryClient.fetchQuery({queryKey: ['getAllTrips']})
		}
	}, [data.length])

	useEffect(() => {
		if(data.length) {
			setFilteredData(data)
		}
	}, [data?.length])

	// TODO handle error in providers
	if(error) {
		return <Typography variant='subtitle1'>Error!</Typography>
	}

	//TODO reconsider this
	if(isLoading) {
		return < CircularProgress size={20} />
	}

	return data && (
		<Box
			height="100%"
			width="100%"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			p={3}
		>      
			<NavigationButtons
				onClick={
					(status?: CardStatus) => { setFilteredData(status ? data.filter((trip)=> trip.status === status) : data) }
				}/> 
			<Grid
				container
				component="main"
				gap="24px"
				columns={12}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					maxWidth: '100%',
					alignItems: 'center',
					mt: 2,
				}}
				>				
				{filteredData?.map(({id, title, description, photo_url, key}) => 				
					<AllTripsCard
						key={key}
						title={title}
						description={description}
						photo_url={photo_url}
						openTripDetails={() => { setOpenTripId(id+title) }}
						onDelete={() => mutation.mutate({id})}
					/> )}
			</Grid>
			<TripDetails
				open={Boolean(openTripId)}
				handleClose={() => { setOpenTripId(undefined) }
				}
				openTripId={openTripId}
			/>
		</Box>
	);
}