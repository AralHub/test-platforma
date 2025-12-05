import { LoadingOutlined } from "@ant-design/icons"
import { createFileRoute } from "@tanstack/react-router"
import { Flex } from "antd"
import { Test } from "src/pages/tests"

export const Route = createFileRoute("/_layout/tests/$testId/")({
	component: RouteComponent,
	pendingComponent: () => (
		<Flex justify="center" align="center" style={{ height: "100%" }}>
			<LoadingOutlined style={{ fontSize: 30 }} />
		</Flex>
	)
})

function RouteComponent() {
	return <Test />
}
