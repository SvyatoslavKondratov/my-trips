/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {CardStatus, type AllTripsCardType} from '../types/card-types';

export function useSearch() {
	const queryClient = useQueryClient();
	const search = async (searchQuery: string) => {
		const queryKey = ['getAllTrips'];
		const data = queryClient.getQueryData<AllTripsCardType[]>(queryKey);

		const searchedTrips = data?.filter(
			(item: AllTripsCardType) =>
				item.title
					.toLocaleLowerCase()
					.includes(searchQuery.toLocaleLowerCase()) ||
				item.description
					.toLocaleLowerCase()
					.includes(searchQuery.toLocaleLowerCase()),
		);

		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', CardStatus.all],
				type: 'inactive',
			},
			searchedTrips,
		);
		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', CardStatus.todo],
				type: 'inactive',
			},
			searchedTrips?.filter(({status}) => status === CardStatus.todo),
		);
		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', CardStatus.done],
				type: 'inactive',
			},
			searchedTrips?.filter(({status}) => status === CardStatus.done),
		);
		queryClient.setQueryData(['searchedTrips'], searchedTrips);
	};

	return {search};
}
