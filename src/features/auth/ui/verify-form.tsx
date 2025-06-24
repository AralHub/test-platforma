import type { FormProps, GetProps } from "antd"
import { Input, Form, App, Modal, Button, Flex } from "antd"
import type { VerifyFormType } from "../model/types"
import { useVerifyMutation } from "../api/api"
import { useEffect, useState, type FC } from "react"
import { useNavigate } from "@tanstack/react-router"

type OTPProps = GetProps<typeof Input.OTP>

interface VerifyFormProps {
	phone_number: string | undefined
	isModalOpen: boolean
	onCancel: () => void
}

const { useApp } = App

export const VerifyForm: FC<VerifyFormProps> = ({
	phone_number,
	isModalOpen,
	onCancel
}) => {
	const [form] = Form.useForm<VerifyFormType>()
	const [verifyCode, setVerifyCod] = useState<string>("")
	const navigate = useNavigate()
	const { message } = useApp()
	const {
		mutate: verify,
		isPending: verifyLoading,
		isSuccess
	} = useVerifyMutation()

	useEffect(() => {
		if (isSuccess) {
			message.success("Вы прошли верификацию")
			navigate({ to: "/auth/login" })
		}
	}, [isSuccess, message, navigate])

	const onFinish: FormProps<VerifyFormType>["onFinish"] = () => {
		verify({ phone_number: phone_number!, code: verifyCode })
	}
	const onChange: OTPProps["onChange"] = (text) => {
		setVerifyCod(text)
	}

	return (
		<Modal
			title={<Flex justify="center">Подтверждение</Flex>}
			open={isModalOpen}
			footer={null}
			centered={true}
			onCancel={onCancel}
		>
			<Form
				autoComplete={"off"}
				layout={"vertical"}
				requiredMark={false}
				size={"large"}
				form={form}
				onFinish={onFinish}
				name={"login-form"}
				labelCol={{
					style: {
						display: "none"
					}
				}}
			>
				<Form.Item<VerifyFormType>
					label={"Код"}
					name={"code"}
					rules={[{ required: true }]}
				>
					<Flex justify="center" style={{ marginTop: 20 }}>
						<Input.OTP length={5} onChange={onChange} />
					</Flex>
				</Form.Item>
				<Form.Item noStyle={true}>
					<Flex justify="center" gap={10}>
						<Button
							loading={verifyLoading}
							type={"primary"}
							htmlType={"submit"}
						>
							Подтвердить
						</Button>
					</Flex>
				</Form.Item>
			</Form>
		</Modal>
	)
}
