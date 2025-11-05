export type Users = {
	id: number
	name: string
	exams: {
		id: number
		title: string
		total_score: number
		total_time: number
	}[]
}

export type UserAnswer = {
	question_id: number
	question_text: string
	selected_option_id: number
	is_correct: boolean
	options: {
		option_id: number
		option_text: string
	}[]
}
