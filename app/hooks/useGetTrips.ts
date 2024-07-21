/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {CardStatus, type AllTripsCardType} from '../types/card-types';

const filterTrips = (status: CardStatus, cachedData: AllTripsCardType[]) =>
	cachedData.filter((cachedItem) => cachedItem.status === status);

export function useGetTrips() {
	const queryClient = useQueryClient();

	const fetchTrips = async (status: CardStatus): Promise<void> => {
		const queryKey = ['getAllTrips'];
		const cachedData = queryClient.getQueryData<AllTripsCardType[]>(queryKey);
		const data =
			cachedData ??
			(await queryClient.fetchQuery<AllTripsCardType[]>({queryKey}));
		const searchedTrips = queryClient.getQueryData<AllTripsCardType[]>([
			'searchedTrips',
		]);

		const filteredTrips =
			status === CardStatus.all ? data : filterTrips(status, data);

		const result =
			Array.isArray(searchedTrips) && searchedTrips.length > 0
				? filteredTrips.filter((filteredTrip) =>
						searchedTrips
							.map(({id, title}) => id + title)
							.includes(filteredTrip.id + filteredTrip.title),
					)
				: filteredTrips;
		queryClient.setQueryData(['getFilteredTrips', status], result);
	};

	return {fetchTrips};
}
