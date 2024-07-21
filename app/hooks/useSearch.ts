/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {type AllTripsCardType} from '../types/card-types';

export function useSearch() {
	const queryClient = useQueryClient();
	const search = async (searchQuery: string) => {
		let data: AllTripsCardType[] | undefined;
		const queryKey = ['getAllTrips'];
		data = queryClient.getQueryData<AllTripsCardType[]>(queryKey);

		// TODO this hack is to use search to refect not only to reload page
		if (!data || searchQuery === '') {
			data = await queryClient.fetchQuery({queryKey});
		}

		const value = data?.filter(
			(item: AllTripsCardType) =>
				item.title.includes(searchQuery) ||
				item.description.includes(searchQuery),
		);
		queryClient.setQueriesData({queryKey, type: 'all'}, value);
	};

	return {search};
}
