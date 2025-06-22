import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Flex } from "antd"

export const Route = createFileRoute("/auth/_auth-layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<Flex justify={"center"} align={"center"}>
			<Outlet />
		</Flex>
	)
}
