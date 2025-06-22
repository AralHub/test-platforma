import { createFileRoute } from "@tanstack/react-router"
import { QuestionsPage } from "src/pages/questions"

export const Route = createFileRoute("/_layout/exam/$exam_id")({
	component: RouteComponent
})

function RouteComponent() {
	return <QuestionsPage />
}
