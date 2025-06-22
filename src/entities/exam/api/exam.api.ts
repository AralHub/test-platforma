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

export const useUpdateStatus = () =>
	useCrudMutation({
		mutationFn: examService.status,
		invalidate: { queryKey: ["exam"] }
	})

export const useDeleteExam = () =>
	useCrudMutation({
		mutationFn: examService.delete,
		invalidate: { queryKey: ["exam"] }
	})

export const useGetExamSubjects = () =>
	useCrudQuery({ queryFn: examService.getSubjects, queryKey: ["subjects"] })

export const useStartTest = () =>
	useCrudMutation({
		mutationFn: examService.start,
		invalidate: { queryKey: ["subjects"] }
	})

export const useFinishTest = () =>
	useCrudMutation({
		mutationFn: examService.finish,
		invalidate: { queryKey: ["subjects"] }
	})
