'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type ReactNode, useState} from 'react';

export default function ReactQueryClientProvider({
	children,
}: {
	readonly children: ReactNode;
}) {
	const [queryClient] = useState(
        // TODO add here query cahche and error handler
		() => new QueryClient(),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
