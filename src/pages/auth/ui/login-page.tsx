import { LoginForm } from "src/features/auth"
import { ResponsiveForm } from "src/shared/ui"

export const LoginPage = () => {
	return <ResponsiveForm children={<LoginForm />} />
}
