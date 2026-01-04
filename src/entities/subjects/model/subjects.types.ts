export type Subject = {
	id: number
	name: string
}

export type SubjectChange = {
	id?: number | string
	name: string
}
export type SubjectsQuestionFile = {
	subject_id?: number | string
	file: File
}
