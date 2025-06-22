import { createContext } from "react"
import type { Tokens } from "../api"

export type AuthContextValues = {
	isAuth: boolean
	login: (token: Tokens) => void
	logout: () => void
	role: string | null
}

export const AuthContext = createContext<AuthContextValues | null>(null)
