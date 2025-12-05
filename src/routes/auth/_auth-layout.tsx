import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Flex } from "antd"
import { useEffect } from "react"

export const Route = createFileRoute("/auth/_auth-layout")({
	component: RouteComponent
})

function RouteComponent() {
	const queryClient = useQueryClient()

	useEffect(() => {
		queryClient.clear()
	}, [queryClient])
	return (
		<Flex justify={"center"} align={"center"}>
			<Outlet />
		</Flex>
	)
}
