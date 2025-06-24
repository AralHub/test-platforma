import type { ResponseData, ResponseSingleData } from "src/shared/api"
import { api } from "src/shared/api"
import type { AddImage, QuestionCreate, Questions, QuestionsData } from ".."

class QuestionsService {
	get = async (
		id: string | undefined
	): Promise<ResponseSingleData<QuestionsData>> => {
		const response = await api.get(`/exams/${id}/questions`)
		return response.data
	}
	getAdmin = async (
		id: string | undefined
	): Promise<ResponseData<Questions>> => {
		const response = await api.get(`/admin/exams/${id}/questions`)
		return response.data
	}
	addImage = async ({ question_id, image }: AddImage) => {
		const imageFormData = new FormData()
		imageFormData.append("image", image)
		const response = await api.put(
			`/admin/exams/questions/${question_id}/image`,
			imageFormData
		)
		return response.data
	}
	create = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.post(`/admin/exams/${id}/questions`, form)
		return response.data
	}
	edit = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.put(`/admin/exams/questions/${id}`, form)
		return response.data
	}
	delete = async (id: string) => {
		const response = await api.delete(`/admin/exams/questions/${id}`)
		return response.data
	}
}

export const questionsService = new QuestionsService()
