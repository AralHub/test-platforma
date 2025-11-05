import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { examService } from "../model/exam.service"
import type { GetParams, ParamId } from "src/shared/types"

export const useCreateExam = () =>
	useCrudMutation({
		mutationFn: examService.create,
		invalidate: { queryKey: ["exam"] }
	})

export const useGetExamList = () =>
	useCrudQuery({
		queryFn: examService.get,
		queryKey: ["exam"]
	})
	
export const useGetExamListByUserId = (id: ParamId) =>
	useCrudQuery({
		queryFn: () => examService.getByUserId(id),
		queryKey: ["exam", "user", id]
	})

export const useGetStats = (id: string | number | undefined, params: GetParams) =>
	useCrudQuery({
		queryFn: () => examService.getStats(id, params),
		queryKey: ["exam", "stats", id, ...Object.values(params)],
		enabled: !!id
	})

export const useEditExam = () =>
	useCrudMutation({
		mutationFn: examService.edit,
		invalidate: { queryKey: ["exam"] }
	})

export const useDeleteExam = () =>
	useCrudMutation({
		mutationFn: examService.delete,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["users"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})

export const useGetExamSubjects = () =>
	useCrudQuery({ queryFn: examService.getSubjects, queryKey: ["subjects"] })

export const useStartTest = () =>
	useCrudMutation({
		mutationFn: examService.start,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["questions"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})

export const useFinishTest = () =>
	useCrudMutation({
		mutationFn: examService.finish,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
			await queryClient.refetchQueries({
				queryKey: ["users"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam", "stats"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})

export const useUpdateStatus = () =>
	useCrudMutation({
		mutationFn: examService.status,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
			await queryClient.refetchQueries({
				queryKey: ["subjects"]
			})
				await queryClient.refetchQueries({
				queryKey: ["exam", "stats"]
			})
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
		}
	})
