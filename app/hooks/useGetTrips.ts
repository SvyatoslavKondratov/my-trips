/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {TripStatus, type TripType} from '../types/card-types';

const filterTrips = (status: TripStatus, cachedData: TripType[]) =>
	cachedData.filter((cachedItem) => cachedItem.status === status);

export function useGetTrips() {
	const queryClient = useQueryClient();

	const fetchTrips = async (status: TripStatus): Promise<void> => {
		const queryKey = ['getAllTrips'];
		const cachedData = queryClient.getQueryData<TripType[]>(queryKey);
		const data =
			cachedData ?? (await queryClient.fetchQuery<TripType[]>({queryKey}));
		const searchedTrips = queryClient.getQueryData<TripType[]>([
			'searchedTrips',
		]);

		const filteredTrips =
			status === TripStatus.all ? data : filterTrips(status, data);

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
