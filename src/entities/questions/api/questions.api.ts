import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { questionsService } from ".."

export const useGetQuestionsList = (id: string) =>
	useCrudQuery({
		queryFn: () => questionsService.get(id),
		queryKey: ["questions", id]
	})

export const useGetAdminQuestions = (id: string) =>
	useCrudQuery({
		queryFn: () => questionsService.getAdmin(id),
		queryKey: ["questions", id]
	})

export const useCreateQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.create,
		invalidate: {
			queryKey: ["questions"]
		}
	})

export const useEditQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.edit,
		invalidate: { queryKey: ["questions"] }
	})

export const useDeleteQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.delete,
		invalidate: { queryKey: ["questions"] }
	})

export const useAddImage = () =>
	useCrudMutation({
		mutationFn: questionsService.addImage,
		invalidate: { queryKey: ["questions"] }
	})
