import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AllTripsCardType } from "../types/card-types"
import { BASE_URL } from "../constants/urls"

export const useDeleteTripMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({ 
        mutationFn: async (data: {id: number }) => { 
        const { id } = data
        await fetch(`${BASE_URL}/travels/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
		  return id;
        },
        onSuccess: (responseId) => {
			const data = queryClient.getQueryData<AllTripsCardType[]>(['getAllTrips'])
            queryClient.setQueryData(
                ['getAllTrips'],
                data?.filter(({ id }) => id !== responseId),
            ) 
        },
        onError : (error) => {
            // TODO log error
            console.log('Error', error)
        }
	})
}