import { createFileRoute } from "@tanstack/react-router"
import { TestsPage } from "src/pages/tests"

export const Route = createFileRoute("/_layout/tests/")({
	component: RouteComponent
})

function RouteComponent() {
	return <TestsPage />
}
