/* eslint-disable n/file-extension-in-import */
import {useQueryClient} from '@tanstack/react-query';
import {type AllTripsCardType} from '../types/card-types';

export function useSearch() {
	const queryClient = useQueryClient();
	const search = (searchQuery: string) => {
		const queryKey = ['getAllTrips'];
		const data = queryClient.getQueryData<AllTripsCardType[]>(queryKey);

		if (!data) {
			void queryClient.fetchQuery({queryKey});
			return;
		}

		queryClient.setQueryData(
			queryKey,
			data.filter(
				(item: AllTripsCardType) =>
					item.title.includes(searchQuery) ||
					item.description.includes(searchQuery),
			),
		);
	};

	return {search};
}
