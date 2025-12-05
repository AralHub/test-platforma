import { createFileRoute } from "@tanstack/react-router"
import { StatisticsPage } from "src/pages/statistics"

export const Route = createFileRoute("/_layout/statistics/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<StatisticsPage />
		</>
	)
}
