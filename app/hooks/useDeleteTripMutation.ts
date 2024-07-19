/* eslint-disable n/file-extension-in-import */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {type AllTripsCardType} from '../types/card-types';
import {BASE_URL} from '../constants/urls';

export const useDeleteTripMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
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
		onSuccess(responseId) {
			const data = queryClient.getQueryData<AllTripsCardType[]>([
				'getAllTrips',
			]);
			queryClient.setQueryData(
				['getAllTrips'],
				data?.filter(({id}) => id !== responseId),
			);
		},
		onError(error) {
			// TODO log error
			console.log('Error', error);
		},
	});
};
