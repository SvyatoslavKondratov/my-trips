/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable n/file-extension-in-import */
'use client';
import * as React from 'react';
import {CircularProgress, Grid, Typography} from '@mui/material';
import {useMutationState, useQueries} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import AllTripsCard from '../cards/all/all-trips-card';
import {CardStatus, type AllTripsCardType} from '../../types/card-types';
import {TripDetails} from '../trip-details/trip-details';
import {useDeleteTripMutation} from '../../hooks/useDeleteTripMutation';
import {useGetTrips} from '@/app/hooks/useGetTrips';

export default function CardList({status}: {status: CardStatus}) {
	// Const {isStale, isFetched} = useQuery<AllTripsCardType[]>({
	// 	queryKey: ['getAllTrips'],
	// });
	// console.log('isStale', isStale, 'isFetched', isFetched);

	const queries = [{}, {status: CardStatus.done}, {status: CardStatus.todo}];

	const combinedQueries = useQueries({
		queries: queries.map((query) => ({
			queryKey: ['getAllTrips', query],
		})),
		combine(results) {
			return {
				data: results.map((result) => result.data),
				isLoading: false,
				error: results.some((result) => result.error),
			};
		},
	});

	const {data = [], error, isLoading} = combinedQueries;
	// Const data = dataObject[status];

	// TODO fix this
	const tripData = data.find((trips) =>
		status === CardStatus.all && trips
			? trips[0]
			: trips?.every((trip) => trip.status === status),
	) as AllTripsCardType[];

	const {fetchTrips} = useGetTrips();

	const mutation = useDeleteTripMutation();
	const successMutation = useMutationState({
		filters: {status: 'success'},
	});
	const [openTripId, setOpenTripId] = useState<string | undefined>();
	console.log('successMutation', successMutation);

	useEffect(() => {
		const getTrips = async () => {
			await fetchTrips(CardStatus.all);
		};

		void getTrips();
	}, []);

	useEffect(() => {
		if (successMutation.length > 0) {
			const getTrips = async () => {
				await fetchTrips(status);
			};

			void getTrips();
		}
	}, [successMutation.length]);

	// TODO handle error in providers
	if (error) {
		return <Typography variant="subtitle1">Error!</Typography>;
	}

	// TODO reconsider this
	if (isLoading) {
		return <CircularProgress size={20} />;
	}

	return (
		tripData && (
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
						{tripData?.map(({id, title, description, photo_url, key}) => (
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
