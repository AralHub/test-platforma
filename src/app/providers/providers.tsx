import { type FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd-provider"
import { AuthProvider } from "./auth-provider"
import { ReactQueryProvider } from "./react-query-provider"

const Providers: FC<PropsWithChildren> = ({ children }) => (
	<ReactQueryProvider>
		<AuthProvider>
			<AntdProvider>{children}</AntdProvider>
		</AuthProvider>
	</ReactQueryProvider>
)

export { Providers }
