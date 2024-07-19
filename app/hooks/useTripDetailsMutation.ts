import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AllTripsCardType, CardStatus } from "../types/card-types"
import { BASE_URL } from "../constants/urls"

export const useTripDetailsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({ 
        mutationFn: async (data: {id: number, status: CardStatus}) => { 
        const { id, status } = data
        const response = await fetch(`${BASE_URL}/travels/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        return response.json()
        },
        onSuccess: (response) => {
            const data = queryClient.getQueryData<AllTripsCardType[]>(['getAllTrips'])
            queryClient.setQueriesData(
                {queryKey: ['getAllTrips']},
                data?.map(({ id, ...rest }: AllTripsCardType) => id === response.id ? response : ({id, ...rest })),
            )         
        },
        onError : (error) => {
            // TODO log error
            console.log('Error', error)
        }
    })
}