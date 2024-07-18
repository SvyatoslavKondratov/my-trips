'use client';
import * as React from 'react';
import {Box, CircularProgress, Grid} from '@mui/material';
import AllTripsCard from '../components/cards/all/all-trips-card';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { AllTripsCardType, CardStatus } from '../types/card-types';
import { TripDetails } from '../components/trip-details/trip-details';
import { useState, useEffect } from 'react';
import NavigationButtons from '../components/buttons/navigation-buttons/navigation-buttons';

export default function Landing() {
	const {data, error, isLoading} = useQuery<AllTripsCardType[]>({
		queryKey: ['getAllTrips'],
		queryFn: async () => (await fetch('https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels')).json(),
	});

	const queryClient = new QueryClient()
    //TODO use hooks!
    const mutation = useMutation({ 
        mutationFn: async (data: {id: number }) => { 
        const { id } = data
        //TODO move to config
        await fetch(`https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                id,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
		  return id;
        },
        onSuccess: (responseId) => {
            queryClient.setQueryData(
                ['getAllTrips'],
                data?.filter(({ id }) => id !== responseId),
            )   
			// TODO fix this ugly hack since no update need to fetch and cache trips for getAllTrips or create something else
			setFilteredData(data?.filter(({ id }) => id !== responseId))      
        },
        onError : (error) => {
            // TODO log error
            console.log('Error', error)
        }})
	
	const [isTripDetailsOpened, setOpenTripDetails] = useState(false);
	const [openTripId, setOpenTripId] = useState<string|undefined>();
	const [filteredData, setFilteredData] = useState<AllTripsCardType[]|undefined>(data) 

	useEffect(() => {
		if(data) {
			setFilteredData(data)
		}
	}, [data?.length])

	//TODO handle error in providers

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
				{filteredData?.map(({id, title, description, photo_url}) => 
					<AllTripsCard
						key={id + title}
						title={title}
						description={description}
						photo_url={photo_url}
						openTripDetails={() => {
							setOpenTripDetails(true)
							setOpenTripId(id+title)
						}}
						onDelete={() => mutation.mutate({id})}
					/> )}
			</Grid>
			<TripDetails
				open={isTripDetailsOpened}
				handleClose={
					() => {
						setOpenTripDetails(false)
						setOpenTripId(undefined)
					}
				}
				openTripId={openTripId}
			/>
		</Box>
	);
}