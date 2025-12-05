import { createFileRoute } from "@tanstack/react-router"
import { QuestionsPage } from "src/pages/questions"

export const Route = createFileRoute("/_layout/exams/$examId")({
	component: RouteComponent
})

function RouteComponent() {
	return <QuestionsPage />
}
