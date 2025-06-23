import Cookies from "js-cookie"
import type { TranslateKeys } from "../types"

export const StorageKeys = {
	ACCESS_TOKEN: "access-token",
	REFRESH_TOKEN: "refresh-token",
	ROLE: "role",
	LANG: "lang"
} as const

export const tokenStorage = {
	getAccess: (): string | null => Cookies.get(StorageKeys.ACCESS_TOKEN) || null,
	getRefresh: (): string | null =>
		Cookies.get(StorageKeys.REFRESH_TOKEN) || null,
	getRole: (): string | null => Cookies.get(StorageKeys.ROLE) || null,
	setAccess: (token: string) => {
		Cookies.set(StorageKeys.ACCESS_TOKEN, token, {
			expires: 7
		})
	},
	setRefresh: (token: string) => {
		Cookies.set(StorageKeys.REFRESH_TOKEN, token, {
			expires: 7
		})
	},
	setRole: (role: string) => {
		Cookies.set(StorageKeys.ROLE, role, { expires: 7 })
	},
	removeAccess(): void {
		Cookies.remove(StorageKeys.ACCESS_TOKEN)
	},
	removeRefresh(): void {
		Cookies.remove(StorageKeys.REFRESH_TOKEN)
	},
	removeRole(): void {
		Cookies.remove(StorageKeys.ROLE)
	},
	clear(): void {
		Cookies.remove(StorageKeys.ACCESS_TOKEN)
		Cookies.remove(StorageKeys.REFRESH_TOKEN)
		Cookies.remove(StorageKeys.ROLE)
	}
}

export const langStorage = {
	get: (): TranslateKeys =>
		(Cookies.get(StorageKeys.LANG) as TranslateKeys) || "ru",
	set: (lang: TranslateKeys) =>
		Cookies.set(StorageKeys.LANG, lang, {
			expires: 30
		}),
	clear: () => Cookies.remove(StorageKeys.LANG)
}
