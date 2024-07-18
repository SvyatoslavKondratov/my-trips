import { useQueryClient } from "@tanstack/react-query";
import { AllTripsCardType } from "../types/card-types";

export const useGetTrips = () => {
	const queryClient = useQueryClient();

	const fetchTrips = async (): Promise<AllTripsCardType[] | undefined> => {
		const queryKey = ['getAllTrips'];
		const cachedData =
			queryClient.getQueryData<AllTripsCardType[]>(queryKey);

		if (cachedData) {
			return cachedData;
		}

		return queryClient.fetchQuery({
			queryKey,
			queryFn: async () => (await fetch('https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels')).json(),
		});
	};

	return {fetchTrips};
};