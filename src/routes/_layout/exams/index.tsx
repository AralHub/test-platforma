import { createFileRoute } from "@tanstack/react-router"
import { ExamsPage } from "src/pages/exams"

export const Route = createFileRoute("/_layout/exams/")({
	component: RouteComponent
})

function RouteComponent() {
	return <ExamsPage />
}
