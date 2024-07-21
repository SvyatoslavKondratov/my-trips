/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {TripStatus, type TripType} from '../types/card-types';

export function useSearch() {
	const queryClient = useQueryClient();
	const search = async (searchQuery: string) => {
		const queryKey = ['getAllTrips'];
		const data = queryClient.getQueryData<TripType[]>(queryKey);

		const searchedTrips = data?.filter(
			(item: TripType) =>
				item.title
					.toLocaleLowerCase()
					.includes(searchQuery.toLocaleLowerCase()) ||
				item.description
					.toLocaleLowerCase()
					.includes(searchQuery.toLocaleLowerCase()),
		);

		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', TripStatus.all],
				type: 'inactive',
			},
			searchedTrips,
		);
		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', TripStatus.todo],
				type: 'inactive',
			},
			searchedTrips?.filter(({status}) => status === TripStatus.todo),
		);
		queryClient.setQueriesData(
			{
				queryKey: ['getFilteredTrips', TripStatus.done],
				type: 'inactive',
			},
			searchedTrips?.filter(({status}) => status === TripStatus.done),
		);
		queryClient.setQueryData(['searchedTrips'], searchedTrips);
	};

	return {search};
}
