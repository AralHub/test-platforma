export type QuestionCreate = {
	id: string
	text: string
	options: Variant[]
}

export type Variant = {
	id?: number
	text: string
	is_correct?: boolean
}

export type QuestionsData = {
	questions: Questions[]
	started_at: string
	ended_at: string
}

export type Questions = {
	id: number
	text: string
	image_url?: string
	options: Variant[]
}

export type AddImage = {
	question_id: number
	image: File
}
