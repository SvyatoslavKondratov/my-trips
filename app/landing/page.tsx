/* eslint-disable n/file-extension-in-import */
'use client';
import * as React from 'react';
import {useState} from 'react';
import {Grid} from '@mui/material';
import CardList from '../components/card-list/card-list';
import {Search} from '../components/search/search';
import NavigationButtons from '../components/buttons/navigation-buttons/navigation-buttons';
import {useGetTrips} from '../hooks/useGetTrips';
import {TripStatus} from '../types/card-types';

export default function Landing() {
	const {fetchTrips} = useGetTrips();
	const [status, setStatus] = useState<TripStatus>(TripStatus.all);
	return (
		<Grid>
			<Search />
			<Grid container item mb={2}>
				<NavigationButtons
					onClick={async (status: TripStatus) => {
						await fetchTrips(status);
						setStatus(status);
					}}
				/>
			</Grid>
			<CardList status={status} />
		</Grid>
	);
}
