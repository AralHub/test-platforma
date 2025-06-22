import { RouterProvider } from "@tanstack/react-router"
import { type FC } from "react"
import { useAuth } from "src/shared/hooks"
import { router } from "./router"
import { GlobalStyles } from "./styles"

const App: FC = () => {
	const auth = useAuth()
	return (
		<>
			<GlobalStyles />
			<RouterProvider router={router} context={{ auth }} />
		</>
	)
}

export { App }
