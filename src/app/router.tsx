import { createRouter } from "@tanstack/react-router"
import { routeTree } from "src/routeTree.gen"
import { Loader } from "src/shared/ui/loader"
import { ErrorBoundary } from "src/widgets/error-boundary"
import { NotFound } from "src/widgets/not-found"
// Import the generated route tree

// Create a new router instance
export const router = createRouter({
	routeTree,
	context: {
		auth: undefined
	},
	defaultPreload: "render",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultPendingComponent: () => <Loader loading={true} />,
	defaultNotFoundComponent: NotFound,
	defaultErrorComponent: ErrorBoundary
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
