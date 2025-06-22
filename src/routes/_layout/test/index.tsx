import { createFileRoute } from "@tanstack/react-router"
import { TestPage } from "src/pages/test"

export const Route = createFileRoute("/_layout/test/")({
	component: RouteComponent
})

function RouteComponent() {
	return <TestPage />
}
