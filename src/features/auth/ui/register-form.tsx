import { PhoneOutlined } from "@ant-design/icons"
import type { FormProps } from "antd"
import { Input, Form, Divider, Button, App } from "antd"
import { formatFormPhone } from "src/shared/utils"
import type { RegisterFormType } from "../model/types"
import { useRegisterMutation } from "../api/api"
import { VerifyForm } from "./verify-form"
import { useEffect, useState } from "react"
import { useToken } from "src/shared/hooks"
import { Link } from "@tanstack/react-router"

const { Password: InputPassword } = Input
const { useApp } = App

export const RegisterForm = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { notification } = useApp()
	const [form] = Form.useForm<RegisterFormType>()
	const {
		token: { colorPrimary }
	} = useToken()

	const {
		data: registerData,
		mutate: register,
		isPending: registerLoading,
		isSuccess
	} = useRegisterMutation()

	useEffect(() => {
		if (isSuccess) {
			setIsModalOpen(true)
			notification.success({
				placement: "topRight",
				message: "На этот номер телефона отправлен код подтверждения"
			})
		}
	}, [isSuccess, notification])

	const onFinish: FormProps<RegisterFormType>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		register(values)
	}

	const onCancel = () => setIsModalOpen(false)

	return (
		<>
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
				<Form.Item<RegisterFormType>
					label={"Имя"}
					name={"name"}
					rules={[{ required: true }]}
				>
					<Input placeholder={"Имя"} />
				</Form.Item>
				<Form.Item<RegisterFormType>
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
				<Form.Item<RegisterFormType>
					label={"Пароль"}
					name={"password"}
					rules={[{ required: true }]}
				>
					<InputPassword placeholder={"Пароль"} />
				</Form.Item>

				<Link to="/auth/login" style={{ color: colorPrimary }}>
					У меня уже есть аккаунт
				</Link>
				<Divider style={{ marginBlock: 8 }} />
				<Form.Item noStyle={true}>
					<Button
						loading={registerLoading}
						type={"primary"}
						style={{
							backgroundColor: colorPrimary
						}}
						htmlType={"submit"}
						block={true}
					>
						Регистрация
					</Button>
				</Form.Item>
			</Form>
			<VerifyForm
				onCancel={onCancel}
				isModalOpen={isModalOpen}
				phone_number={registerData?.data.phone_number}
			/>
		</>
	)
}
