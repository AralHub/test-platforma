import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import type { AuthContextValues } from "src/shared/context"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const Route = createRootRouteWithContext<{
	auth?: AuthContextValues
}>()({
	component: RootComponent
})

function RootComponent() {
	return (
		<>
			<Outlet />
			<ReactQueryDevtools buttonPosition={"bottom-left"} />
		</>
	)
}
