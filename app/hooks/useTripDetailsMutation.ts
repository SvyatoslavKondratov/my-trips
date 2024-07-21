import {useMutation, useQueryClient} from '@tanstack/react-query';
// eslint-disable-next-line n/file-extension-in-import
import {type TripType, type TripStatus} from '../types/card-types';
// eslint-disable-next-line n/file-extension-in-import
import {BASE_URL} from '../constants/urls';

export const useTripDetailsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['patch'],
		async mutationFn(data: {id: number; status: TripStatus}) {
			const {id, status} = data;
			const response = await fetch(`${BASE_URL}/travels/${id}`, {
				method: 'PATCH',
				body: JSON.stringify({status}),
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-type': 'application/json; charset=UTF-8',
				},
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
