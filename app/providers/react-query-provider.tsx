'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type ReactNode} from 'react';
import { BASE_URL } from '../constants/urls';

export default function ReactQueryClientProvider({
	children,
}: {
	readonly children: ReactNode;
}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: Infinity,
				enabled: false,
				refetchOnMount: false,	
				queryFn: async () => (await fetch(`${BASE_URL}/travels`)).json(),
				select(data) {
					return Array.isArray(data) ? data.map((item, index) => ({...item, key: index})): data
				},			
			}
		}
	})

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
