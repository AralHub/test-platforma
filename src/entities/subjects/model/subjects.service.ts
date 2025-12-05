import { api, type ResponseSingleData, type ResponseData } from "src/shared/api"
import type { Subject, SubjectChange } from "./subjects.types"
import type { GetParams, ParamId } from "src/shared/types"

class SubjectsService {
	get = async (params: GetParams = {}): Promise<ResponseData<Subject>> => {
		const response = await api.get(`/admin/subjects`, { params })
		return response.data
	}

	getById = async (id: ParamId): Promise<ResponseSingleData<Subject>> => {
		const response = await api.get(`/admin/subjects/${id}`)
		return response.data
	}

	create = async (
		form: SubjectChange
	): Promise<ResponseSingleData<Subject>> => {
		const response = await api.post(`/admin/subjects`, form)
		return response.data
	}

	edit = async (form: SubjectChange): Promise<ResponseSingleData<Subject>> => {
		const response = await api.put(`/admin/subjects/${form.id}`, form)
		return response.data
	}

	delete = async (id: unknown): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/admin/subjects/${id}`)
		return response.data
	}
}

export const subjectsService = new SubjectsService()
