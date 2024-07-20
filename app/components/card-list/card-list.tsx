/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable n/file-extension-in-import */
'use client';
import * as React from 'react';
import {CircularProgress, Grid, Typography} from '@mui/material';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import AllTripsCard from '../cards/all/all-trips-card';
import {type AllTripsCardType, type CardStatus} from '../../types/card-types';
import {TripDetails} from '../trip-details/trip-details';
import NavigationButtons from '../buttons/navigation-buttons/navigation-buttons';
import {useDeleteTripMutation} from '../../hooks/useDeleteTripMutation';

export default function CardList() {
	const {
		data = [],
		error,
		isLoading,
	} = useQuery<AllTripsCardType[]>({queryKey: ['getAllTrips']});

	const queryClient = useQueryClient();

	// TODO use hooks!
	const mutation = useDeleteTripMutation();

	const [openTripId, setOpenTripId] = useState<string | undefined>();
	const [filteredData, setFilteredData] = useState<AllTripsCardType[]>(data);

	useEffect(() => {
		if (data.length === 0) {
			void queryClient.fetchQuery({queryKey: ['getAllTrips']});
		}
	}, [data.length]);

	useEffect(() => {
		if (data.length > 0) {
			setFilteredData(data);
		}
	}, [data?.length]);

	// TODO handle error in providers
	if (error) {
		return <Typography variant="subtitle1">Error!</Typography>;
	}

	// TODO reconsider this
	if (isLoading) {
		return <CircularProgress size={20} />;
	}

	return (
		data && (
			<Grid container justifyContent="center">
				<Grid
					container
					item
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					columns={12}
					width="90%"
				>
					<Grid container item mb={2}>
						<NavigationButtons
							onClick={(status?: CardStatus) => {
								setFilteredData(
									status ? data.filter((trip) => trip.status === status) : data,
								);
							}}
						/>
					</Grid>
					<Grid
						container
						item
						component="main"
						gap="24px"
						sx={{
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
							alignItems: 'center',
						}}
					>
						{filteredData?.map(({id, title, description, photo_url, key}) => (
							<AllTripsCard
								key={key}
								title={title}
								description={description}
								photo_url={photo_url}
								openTripDetails={() => {
									setOpenTripId(id + title);
								}}
								onDelete={() => {
									mutation.mutate({id});
								}}
							/>
						))}
					</Grid>
					<TripDetails
						open={Boolean(openTripId)}
						handleClose={() => {
							setOpenTripId(undefined);
						}}
						openTripId={openTripId}
					/>
				</Grid>
			</Grid>
		)
	);
}
