/* eslint-disable n/file-extension-in-import */
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {BASE_URL} from '../constants/urls';
import {type TripType} from '../types/card-types';

export const useUpdateTripMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['update'],
		async mutationFn(data: {id: number; trip: Partial<TripType>}) {
			const {id, trip} = data;
			const response = await fetch(`${BASE_URL}/travels/${id}`, {
				method: 'PUT',
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify(trip),
			});
			return response.json();
		},
		// TODO fix description issue during editing trip, now it's not sent
		onSuccess(response: TripType) {
			const data = queryClient.getQueryData<TripType[]>(['getAllTrips']);
			queryClient.setQueriesData(
				{queryKey: ['getAllTrips']},
				data?.map(({id, ...rest}: TripType) =>
					id === response.id ? {...rest, ...response} : {id, ...rest},
				),
			);
		},
		onError(error) {
			// TODO log error
			console.log('Error', error);
		},
	});
};
