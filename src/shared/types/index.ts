export type IdName = {
	id: number
	name: string
}

export type TranslateName = {
	ru: string
	en: string
	uz: string
	kk: string
}

export type TranslateKeys = keyof TranslateName

export type GetParams = {
	page?: number
	page_size?: number
	search?: string
}

export type ParamId = number | string | null | undefined
