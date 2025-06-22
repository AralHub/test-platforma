import { createFileRoute } from "@tanstack/react-router"
import { ExamPage } from "src/pages/exam"

export const Route = createFileRoute("/_layout/exam/")({
	component: RouteComponent
})

function RouteComponent() {
	return <ExamPage />
}
