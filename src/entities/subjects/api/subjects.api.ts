import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { subjectsService } from "../model/subjects.service"
import type { GetParams, ParamId } from "src/shared/types"

export const useGetSubjectsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => subjectsService.get(params),
		queryKey: ["subjects", ...Object.values(params)]
	})
}

export const useGetSubjectsByIdQuery = (id: ParamId) => {
	return useCrudQuery({
		queryFn: () => subjectsService.getById(id),
		queryKey: ["subjects", "by-id", id],
		enabled: !!id
	})
}

export const useCreateSubjectsQuestionFile = () => {
	return useCrudMutation({
		mutationFn: subjectsService.addFile,
		mutationKey: ["subjects", "create"],
		invalidate: {
			queryKey: ["subjects"]
		},
		success: {}
	})
}

export const useCreateSubjectsMutation = () => {
	return useCrudMutation({
		mutationFn: subjectsService.create,
		mutationKey: ["subjects", "create"],
		invalidate: {
			queryKey: ["subjects"]
		},
		success: {}
	})
}

export const useEditSubjectsMutation = () => {
	return useCrudMutation({
		mutationFn: subjectsService.edit,
		mutationKey: ["subjects", "edit"],
		invalidate: {
			queryKey: ["subjects"]
		},
		success: {}
	})
}

export const useDeleteSubjectsMutation = () => {
	return useCrudMutation({
		mutationFn: subjectsService.delete,
		mutationKey: ["subjects", "delete"],
		invalidate: {
			queryKey: ["subjects"]
		},
		success: {}
	})
}
