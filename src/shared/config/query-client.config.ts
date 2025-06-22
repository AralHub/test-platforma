import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 1000 * 60 * 60 * 2,
			retry: 1,
			retryDelay: 1000
		}
	}
})
