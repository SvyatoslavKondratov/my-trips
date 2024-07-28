import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type ReactNode} from 'react';

const queryClient = new QueryClient();

export const withMockedQueryClient = (Component: ReactNode) => {
	return (
		<QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
	);
};
