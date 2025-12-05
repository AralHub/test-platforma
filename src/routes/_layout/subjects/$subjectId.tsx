import { createFileRoute } from "@tanstack/react-router"
import { SubjectQuestionsPage } from "src/pages/subject-questions"

export const Route = createFileRoute("/_layout/subjects/$subjectId")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<SubjectQuestionsPage />
		</>
	)
}
