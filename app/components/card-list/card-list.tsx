/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable n/file-extension-in-import */
'use client';
import * as React from 'react';
import {CircularProgress, Grid, Typography} from '@mui/material';
import {useMutationState, useQueries} from '@tanstack/react-query';
import {useState, useEffect} from 'react';
import AllTripsCard from '../cards/all/all-trips-card';
import {TripStatus, type TripType} from '../../types/card-types';
import {TripDetails} from '../trip-details/trip-details';
import {useDeleteTripMutation} from '../../hooks/useDeleteTripMutation';
import {CreateTrip} from '../create-trip/create-trip';
import {useGetTrips} from '@/app/hooks/useGetTrips';

export default function CardList({status}: {status: TripStatus}) {
	const queries = [TripStatus.all, TripStatus.done, TripStatus.todo];

	const combinedQueries = useQueries({
		queries: queries.map((query) => ({
			queryKey: ['getFilteredTrips', query],
		})),
		combine(results) {
			return {
				data: results.map((result) => result.data) as TripType[][],
				isLoading: results.every((result) => !result.isFetched),
				error: results.some((result) => result.error),
			};
		},
	});

	const {data = [], isLoading, error} = combinedQueries;

	const tripObject = {
		[TripStatus.all]: (statusArray: TripStatus[]) =>
			statusArray?.every((item) =>
				[TripStatus.done, TripStatus.todo].includes(item),
			),
		[TripStatus.done]: (statusArray: TripStatus[]) =>
			statusArray?.every((item) => item === status),
		[TripStatus.todo]: (statusArray: TripStatus[]) =>
			statusArray?.every((item) => item === status),
	};

	let tripData = [] as TripType[];
	for (const trips of data) {
		const statusArray = trips?.map(({status}) => status);
		if (statusArray?.length > 0 && tripObject[status](statusArray)) {
			tripData = trips;
			break;
		}
	}

	const {fetchTrips} = useGetTrips();

	const mutation = useDeleteTripMutation();
	const successMutation = useMutationState({
		filters: {status: 'success'},
	});
	const [openTripId, setOpenTripId] = useState<string | undefined>();
	const [openEditId, setOpenEditId] = useState<string | undefined>();

	useEffect(() => {
		const getTrips = async () => {
			await fetchTrips(TripStatus.all);
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
		return (
			<Grid container justifyContent="center">
				<CircularProgress size={20} />
			</Grid>
		);
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
								onEdit={() => {
									setOpenEditId(id + title);
								}}
								onDelete={() => {
									mutation.mutate({id});
								}}
							/>
						))}
					</Grid>
					{openTripId && (
						<TripDetails
							open={Boolean(openTripId)}
							handleClose={() => {
								setOpenTripId(undefined);
							}}
							openTripId={openTripId}
						/>
					)}
					{openEditId && (
						<CreateTrip
							open={Boolean(openEditId)}
							handleClose={() => {
								setOpenEditId(undefined);
							}}
							trip={tripData.find(({id, title}) => openEditId === id + title)}
						/>
					)}
				</Grid>
			</Grid>
		)
	);
}
