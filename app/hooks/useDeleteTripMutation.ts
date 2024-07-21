/* eslint-disable n/file-extension-in-import */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {type TripType} from '../types/card-types';
import {BASE_URL} from '../constants/urls';

export const useDeleteTripMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['delete'],
		async mutationFn(data: {id: number}) {
			const {id} = data;
			await fetch(`${BASE_URL}/travels/${id}`, {
				method: 'DELETE',
				body: JSON.stringify({id}),
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			return id;
		},
		async onSuccess(responseId) {
			const data = queryClient.getQueryData<TripType[]>(['getAllTrips']);
			const value = data?.filter(({id}) => id !== responseId);
			queryClient.setQueryData(['getAllTrips'], value);
		},
		onError(error) {
			// TODO log error
			console.log('Error', error);
		},
	});
};
