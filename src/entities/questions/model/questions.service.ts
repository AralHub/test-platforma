import type { ResponseData, ResponseSingleData } from "src/shared/api"
import { api } from "src/shared/api"
import type {
	AddImage,
	QuestionCreate,
	QuestionGenerate,
	Questions,
	QuestionsData
} from ".."
import type { ParamId } from "src/shared/types"

class QuestionsService {
	get = async (id: ParamId): Promise<ResponseSingleData<QuestionsData>> => {
		const response = await api.get(`/exams/${id}/questions`)
		return response.data
	}
	getAdmin = async (
		id: ParamId,
		type: "by_subject" | "by_exam" = "by_exam"
	): Promise<ResponseData<Questions>> => {
		const response = await api.get(`/admin/questions/${type}`, {
			params: {
				[type === "by_subject" ? "subject_id" : "exam_id"]: id
			}
		})
		return response.data
	}
	addImage = async ({ question_id, image }: AddImage) => {
		const imageFormData = new FormData()
		imageFormData.append("image", image)
		const response = await api.put(
			`/admin/questions/${question_id}/image`,
			imageFormData
		)
		return response.data
	}
	create = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.post(`/admin/questions`, form, {
			params: {
				subject_id: id
			}
		})
		return response.data
	}
	generate = async ({ id, ...form }: QuestionGenerate) => {
		const response = await api.post(`/admin/questions/generate`, undefined, {
			params: {
				subject_id: id,
				...form
			}
		})
		return response.data
	}
	edit = async ({ id, ...form }: QuestionCreate) => {
		const response = await api.put(`/admin/questions/${id}`, form)
		return response.data
	}
	deleteByExams = async (examId: ParamId, id: ParamId) => {
		const response = await api.delete(`/admin/exams/${examId}/questions/${id}`)
		return response.data
	}
	delete = async (id: string) => {
		const response = await api.delete(`/admin/questions/${id}`)
		return response.data
	}
}

export const questionsService = new QuestionsService()
