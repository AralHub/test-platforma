import type { FormProps } from "antd"
import { Form, Input, InputNumber } from "antd"
import { FormDrawer } from "src/shared/ui"
import { useFormDevtoolsStore } from "src/shared/store"
import { useEffect } from "react"
import { useCreateExam, useEditExam, type Exam } from "src/entities/exam"

export const ExamForm = () => {
	const [form] = Form.useForm<Exam>()
	const {
		mutate: create,
		isPending: createPending,
		isSuccess: createSuccess
	} = useCreateExam()

	const {
		mutate: edit,
		isPending: editPending,
		isSuccess: editSuccess
	} = useEditExam()

	const params = useFormDevtoolsStore((state) => state.getParams<Exam>())
	const onFinish: FormProps<Exam>["onFinish"] = (values) => {
		if (params) {
			edit({
				...values,
				id: params.id
			})
			return
		}
		create(values)
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
				onFinish={onFinish}
				autoComplete={"off"}
				layout={"vertical"}
			>
				<Form.Item<Exam> name={"title"} label={"Название предмета"}>
					<Input />
				</Form.Item>
				<Form.Item<Exam> name={"description"} label={"Описание предмета"}>
					<Input />
				</Form.Item>
				<Form.Item<Exam>
					name={"time_limit_minutes"}
					label={"Время теста в минутах"}
				>
					<InputNumber style={{ width: "100%" }} />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}
