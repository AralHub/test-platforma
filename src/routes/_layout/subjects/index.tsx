import { createFileRoute } from "@tanstack/react-router"
import { SubjectsPage } from "src/pages/subjects"

export const Route = createFileRoute("/_layout/subjects/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <SubjectsPage />
    </>
  )
}
