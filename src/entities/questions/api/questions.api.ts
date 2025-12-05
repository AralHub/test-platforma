import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { questionsService } from ".."
import type { ParamId } from "src/shared/types"

export const useGetQuestionsList = (id: ParamId) =>
	useCrudQuery({
		queryFn: () => questionsService.get(id),
		queryKey: ["questions", id],
		enabled: !!id
	})

export const useGetAdminQuestions = (
	id: ParamId,
	type: "by_subject" | "by_exam" = "by_exam"
) =>
	useCrudQuery({
		queryFn: () => questionsService.getAdmin(id, type),
		queryKey: ["admin-questions", type, id],
		enabled: !!id
	})

export const useCreateQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.create,
		invalidate: {
			queryKey: ["admin-questions"]
		}
	})

export const useGenerateQuestion = () =>
	useCrudMutation({
		mutationFn: questionsService.generate,
		invalidate: {
			queryKey: ["admin-questions"]
		},
		success: {
			description: "Вопросы успешно сгенерированы."
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
