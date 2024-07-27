'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type ReactNode} from 'react';
// eslint-disable-next-line n/file-extension-in-import
import {BASE_URL} from '../constants/urls';

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
				async queryFn() {
					const response = await fetch(`/api/travels`);
					return response.json();
				},
				select(data) {
					return Array.isArray(data)
						? // eslint-disable-next-line @typescript-eslint/no-unsafe-return
							data.map((item, index) => ({...item, key: index}))
						: data;
				},
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
