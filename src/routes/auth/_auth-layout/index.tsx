import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/_auth-layout/")({
	component: RouteComponent
})

function RouteComponent() {
	return <Navigate to={"/auth/login"} />
}
