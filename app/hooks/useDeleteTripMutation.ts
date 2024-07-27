/* eslint-disable n/file-extension-in-import */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {type TripType} from '../types/card-types';

export const useDeleteTripMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['delete'],
		async mutationFn(data: {id: number}) {
			const {id} = data;
			await fetch(`api/travels/${id}`, {method: 'DELETE'});
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
