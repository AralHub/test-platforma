import { QueryClientProvider } from "@tanstack/react-query"
import { type FC, type PropsWithChildren } from "react"
import { queryClient } from "src/shared/config/query-client.config"

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export { ReactQueryProvider }
