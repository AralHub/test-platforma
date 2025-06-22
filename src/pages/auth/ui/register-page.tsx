import { RegisterForm } from "src/features/auth"
import { ResponsiveForm } from "src/shared/ui"

export const RegisterPage = () => {
	return <ResponsiveForm children={<RegisterForm />} />
}
