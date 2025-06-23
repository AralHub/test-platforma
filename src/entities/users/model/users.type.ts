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
