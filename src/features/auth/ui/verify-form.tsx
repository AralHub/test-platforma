import type { FormProps } from "antd"
import { Input, Form, App, Modal, Button, Flex } from "antd"
import type { VerifyFormType } from "../model/types"
import { useVerifyMutation } from "../api/api"
import { useEffect, type FC } from "react"
import { useNavigate } from "@tanstack/react-router"

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

	const onFinish: FormProps<VerifyFormType>["onFinish"] = (values) => {
		verify({ phone_number: phone_number!, code: values.code })
	}

	return (
		<Modal
			title="Подтверждение"
			open={isModalOpen}
			maskClosable={false}
			closable={false}
			mask={false}
			footer={null}
			okText="Подтвердить"
			cancelText="Отмена"
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
					<Input placeholder={"Код"} />
				</Form.Item>
				<Form.Item noStyle={true}>
					<Flex justify="flex-end" gap={10}>
						<Button htmlType={"reset"} onClick={onCancel}>
							Отменить
						</Button>
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
