import Cookies from "js-cookie"
import type { TranslateKeys } from "../types"

export const TokenKeys = {
	ACCESS_TOKEN: "access-token",
	REFRESH_TOKEN: "refresh-token"
} as const
export const RoleKeys = {
	ROLE: "role"
}
export const LangKeys = {
	LANG: "lang"
} as const

export const tokenStorage = {
	getAccess: (): string | null => Cookies.get(TokenKeys.ACCESS_TOKEN) || null,
	getRefresh: (): string | null => Cookies.get(TokenKeys.REFRESH_TOKEN) || null,
	getRole: (): string | null => Cookies.get(RoleKeys.ROLE) || null,
	setAccess: (token: string) => {
		Cookies.set(TokenKeys.ACCESS_TOKEN, token, {
			expires: 7
		})
	},
	setRefresh: (token: string) => {
		Cookies.set(TokenKeys.REFRESH_TOKEN, token, {
			expires: 7
		})
	},
	setRole: (role: string) => {
		Cookies.set(RoleKeys.ROLE, role, { expires: 7 })
	},
	removeAccess(): void {
		Cookies.remove(TokenKeys.ACCESS_TOKEN)
	},
	removeRefresh(): void {
		Cookies.remove(TokenKeys.REFRESH_TOKEN)
	},
	removeRole(): void {
		Cookies.remove(RoleKeys.ROLE)
	},
	clear(): void {
		Cookies.remove(TokenKeys.ACCESS_TOKEN)
		Cookies.remove(TokenKeys.REFRESH_TOKEN)
		Cookies.remove(RoleKeys.ROLE)
	}
}

export const langStorage = {
	get: (): TranslateKeys =>
		(Cookies.get(LangKeys.LANG) as TranslateKeys) || "ru",
	set: (lang: TranslateKeys) =>
		Cookies.set(LangKeys.LANG, lang, {
			expires: 30
		}),
	clear: () => Cookies.remove(LangKeys.LANG)
}
