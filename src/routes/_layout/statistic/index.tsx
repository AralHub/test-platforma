import { createFileRoute } from "@tanstack/react-router"
import { StatisticPage } from "src/pages/statistic"

export const Route = createFileRoute("/_layout/statistic/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<StatisticPage />
		</>
	)
}
