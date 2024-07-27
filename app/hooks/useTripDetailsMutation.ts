import {useMutation, useQueryClient} from '@tanstack/react-query';
// eslint-disable-next-line n/file-extension-in-import
import {type TripType, type TripStatus} from '../types/card-types';

export const useTripDetailsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['patch'],
		async mutationFn(data: {id: number; status: TripStatus}) {
			const {id, status} = data;
			const response = await fetch(`api/travels/${id}/${status}`, {
				method: 'PATCH',
			});
			return response.json();
		},
		onSuccess(response: TripType) {
			const data = queryClient.getQueryData<TripType[]>(['getAllTrips']);
			queryClient.setQueriesData(
				{queryKey: ['getAllTrips']},
				data?.map(({id, ...rest}: TripType) =>
					id === response.id ? response : {id, ...rest},
				),
			);
		},
		onError(error) {
			// TODO log error
			console.log('Error', error);
		},
	});
};
