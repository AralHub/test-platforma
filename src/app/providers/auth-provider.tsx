import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState
} from "react"
import { AuthContext, type AuthContextValues } from "src/shared/context"
import { tokenStorage } from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.getAccess())
	const [role, setRole] = useState(() => tokenStorage.getRole())

	const login: AuthContextValues["login"] = useCallback((token) => {
		tokenStorage.setAccess(token?.access_token)
		if (token?.refresh_token) {
			tokenStorage.setRefresh(token?.refresh_token)
		}
		if (token?.role) {
			tokenStorage.setRole(token?.role)
			setRole(token?.role)
		}
		setIsAuth(true)
	}, [])

	const logout: AuthContextValues["logout"] = useCallback(() => {
		tokenStorage.clear()
		setRole(null)
		setIsAuth(false)
	}, [])

	const authValues = useMemo(
		() => ({
			isAuth,
			login,
			logout,
			role
		}),
		[isAuth, login, logout, role]
	)
	return (
		<AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
	)
}

export { AuthProvider }
