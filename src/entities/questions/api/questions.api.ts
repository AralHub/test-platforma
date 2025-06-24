import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { questionsService } from ".."

export const useGetQuestionsList = (id: string | undefined) =>
	useCrudQuery({
		queryFn: () => questionsService.get(id),
		queryKey: ["questions", id],
		enabled: !!id
	})

export const useGetAdminQuestions = (id: string | undefined) =>
	useCrudQuery({
		queryFn: () => questionsService.getAdmin(id),
		queryKey: ["admin-questions", id],
		enabled: !!id
	})

export const useCreateQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.create,
		invalidate: {
			queryKey: ["admin-questions"]
		}
	})

export const useEditQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.edit,
		invalidate: { queryKey: ["admin-questions"] }
	})

export const useDeleteQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.delete,
		invalidate: { queryKey: ["admin-questions"] }
	})

export const useAddImage = () =>
	useCrudMutation({
		mutationFn: questionsService.addImage,
		invalidate: { queryKey: ["admin-questions"] }
	})
