import type { FormProps } from "antd"
import { Form, Input } from "antd"
import { useEffect } from "react"
import {
	useCreateSubjectsMutation,
	useEditSubjectsMutation,
	type Subject
} from "src/entities/subjects"
import { useFormDevtoolsStore } from "src/shared/store"
import { FormDrawer } from "src/shared/ui"

export const SubjectsForm = () => {
	const [form] = Form.useForm<Subject>()
	const {
		mutate: addSubject,
		isPending: addPending,
		isSuccess: addSuccess
	} = useCreateSubjectsMutation()

	const {
		mutate: editSubject,
		isPending: editPending,
		isSuccess: editSuccess
	} = useEditSubjectsMutation()

	const params = useFormDevtoolsStore((state) => state.getParams<Subject>())

	const onFinish: FormProps<Subject>["onFinish"] = (values) => {
		if (params) {
			editSubject({
				...values,
				id: params.id
			})
			return
		}
		addSubject(values)
	}
	useEffect(() => {
		form.setFieldsValue({ ...params })
	}, [form, params])
	return (
		<FormDrawer
			form={form}
			loading={addPending || editPending}
			success={addSuccess || editSuccess}
		>
			<Form
				form={form}
				onFinish={onFinish}
				autoComplete={"off"}
				layout={"vertical"}
			>
				<Form.Item<Subject> name={"name"} label={"Название предмета"}>
					<Input />
				</Form.Item>
			</Form>
		</FormDrawer>
	)
}
