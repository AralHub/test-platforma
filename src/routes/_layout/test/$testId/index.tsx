import { createFileRoute } from "@tanstack/react-router"
import { Test } from "src/pages/test"

export const Route = createFileRoute("/_layout/test/$testId/")({
	component: RouteComponent
})

function RouteComponent() {
	return <Test />
}
