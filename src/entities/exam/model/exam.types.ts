export type Exam = {
	id?: number
	title: string
	description: string
	time_limit_minutes: number
	is_active: boolean
	total_score?: number
	passed?: boolean
	is_expired?: boolean
}

export type Stats = {
	question_id: number
	total_responses: number
	count: number
	percent: number
}

export type Start = {
	user_id: number
	exam_id: number
	started_at: string
	ended_at: string
	id: number
}

export type FinishForm = {
	exam_id: string
	answers: Answer[]
}

export type Answer = {
	question_id: number
	option_id: number
}

export type TestResult = {
	total_score: number
}
