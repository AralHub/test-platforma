import { PhoneOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import type { FormProps } from "antd"
import { Input, Form, Divider, Button } from "antd"
import { useEffect } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import { formatFormPhone } from "src/shared/utils"
import type { LoginFormType } from "../model/types"
import { useLoginMutation } from "../api/api"

const { Password: InputPassword } = Input

export const LoginForm = () => {
	const [form] = Form.useForm<LoginFormType>()
	const auth = useAuth()
	const navigate = useNavigate()
	const {
		token: { colorPrimary }
	} = useToken()
	const {
		data: loginData,
		mutate: login,
		isPending: loginLoading,
		isSuccess
	} = useLoginMutation()

	const onFinish: FormProps<LoginFormType>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		login(values)
	}

	useEffect(() => {
		if (isSuccess && loginData?.data) {
			auth.login(loginData.data)
			navigate({ to: "/test", replace: true })
		}
	}, [auth, isSuccess, loginData?.data, navigate])

	return (
		<Form
			autoComplete={"off"}
			layout={"vertical"}
			requiredMark={false}
			size={"large"}
			form={form}
			onFinish={onFinish}
			name={"login-form"}
			labelCol={{ style: { fontWeight: 500 } }}
		>
			<Form.Item<LoginFormType>
				label={"Телефон номер"}
				name={"phone_number"}
				rules={[{ required: true }]}
			>
				<Input
					addonBefore={"+998"}
					placeholder={"Телефон номер"}
					suffix={<PhoneOutlined />}
				/>
			</Form.Item>
			<Form.Item<LoginFormType>
				label={"Пароль"}
				name={"password"}
				rules={[{ required: true }]}
			>
				<InputPassword placeholder={"Пароль"} />
			</Form.Item>
			<Link to="/auth/register" style={{ color: colorPrimary }}>
				Нет аккаунта?
			</Link>
			<Divider style={{ marginBlock: 8 }} />
			<Form.Item noStyle={true}>
				<Button
					loading={loginLoading}
					type={"primary"}
					style={{ backgroundColor: colorPrimary }}
					htmlType={"submit"}
					block={true}
				>
					Войти
				</Button>
			</Form.Item>
		</Form>
	)
}
