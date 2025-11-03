import type { FormProps } from "antd"
import { Button, Form, Input, Checkbox, Flex } from "antd"
import { FormDrawer } from "src/shared/ui"
import type { QuestionCreate } from "src/entities/questions"
import { useCreateQuestion, useEditQuestion } from "src/entities/questions"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { useFormDevtoolsStore } from "src/shared/store"
import { useEffect } from "react"

export const QuestionsForm = () => {
	const [form] = Form.useForm<QuestionCreate>()
	const { exam_id } = useParams({ strict: false })
	const {
		mutate: create,
		isPending: createPending,
		isSuccess: createSuccess
	} = useCreateQuestion()

	const {
		mutate: edit,
		isPending: editPending,
		isSuccess: editSuccess
	} = useEditQuestion()

	const params = useFormDevtoolsStore((state) =>
		state.getParams<QuestionCreate>()
	)

	const onFinish: FormProps<QuestionCreate>["onFinish"] = (values) => {
		if (params) {
			edit({
				...values,
				id: params.id
			})
			return
		}
		create({ id: exam_id!, text: values.text, options: values.options })
	}
	useEffect(() => {
		form.setFieldsValue({ ...params })
	}, [form, params])
	return (
		<FormDrawer
			form={form}
			loading={createPending || editPending}
			success={createSuccess || editSuccess}
		>
			<Form
				form={form}
				name="question_form"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item
					name="text"
					label={"вопрос"}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					rules={[{ required: true }]}
				>
					<Input.TextArea placeholder="Название вопроса" />
				</Form.Item>

				<Form.List name="options" initialValue={[{}, {}]}>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }, index) => (
								<Flex vertical={true} key={key} gap={10}>
									<Form.Item
										{...restField}
										name={[name, "text"]}
										label={"вариант"}
										labelCol={{
											style: {
												display: "none"
											}
										}}
										rules={[{ required: true }]}
										style={{
											marginBottom: 0
										}}
									>
										<Input.TextArea autoSize={true} placeholder={`Вариант ${index + 1}`} />
									</Form.Item>
									<Flex
										justify="space-between"
										align="baseline"
										style={{
											marginBottom: 24
										}}
									>
										<Form.Item
											{...restField}
											name={[name, "is_correct"]}
											valuePropName="checked"
											initialValue={false}
											noStyle={true}
										>
											<Checkbox>Правильный</Checkbox>
										</Form.Item>
										<div>
											<MinusCircleOutlined
												style={{
													display: fields.length > 2 ? "block" : "none"
												}}
												onClick={() => remove(name)}
											/>
										</div>
									</Flex>
								</Flex>
							))}

							<Form.Item>
								<Button
									onClick={() => add()}
									block={true}
									icon={<PlusOutlined />}
								>
									Добавить вариант
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</FormDrawer>
	)
}
