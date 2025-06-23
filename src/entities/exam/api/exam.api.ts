import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { examService } from "../model/exam.service"

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
		}
	})

export const useGetExamSubjects = () =>
	useCrudQuery({ queryFn: examService.getSubjects, queryKey: ["subjects"] })

export const useStartTest = () =>
	useCrudMutation({
		mutationFn: examService.start,
		onSuccessQueryClient: async (queryClient) => {
			await queryClient.refetchQueries({
				queryKey: ["exam"]
			})
			await queryClient.refetchQueries({
				queryKey: ["questions"]
			})
		}
	})

export const useFinishTest = () =>
	useCrudMutation({
		mutationFn: examService.finish,
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
		}
	})
