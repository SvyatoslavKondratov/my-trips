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
		const filteredTrips =
			status === CardStatus.all ? data : filterTrips(status, data);
		const filteredQueryKey =
			status === CardStatus.all
				? ['getAllTrips', {}]
				: ['getAllTrips', {status}];
		queryClient.setQueryData(filteredQueryKey, filteredTrips);
	};

	return {fetchTrips};
}
