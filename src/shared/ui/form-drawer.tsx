import { Drawer, type DrawerProps, type FormInstance } from "antd"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import { type FC, useCallback, useEffect } from "react"
import { type FormKeys, useFormDevtoolsStore } from "src/shared/store"
import { useShallow } from "zustand/react/shallow"

interface FormDrawerProps extends DrawerProps {
	form: FormInstance
	formKey?: FormKeys
	formKeys?: FormKeys[]
	loading: boolean
	success: boolean
}

const FormDrawer: FC<FormDrawerProps> = ({
	form,
	formKey = "main",
	formKeys,
	loading,
	success,
	...props
}) => {
	const {
		open,
		resetParams,
		params,
		formKey: storeKey
	} = useFormDevtoolsStore(useShallow((state) => state))

	const onCloseDrawer = useCallback(() => {
		resetParams()
		form.resetFields()
	}, [resetParams, form])

	useEffect(() => {
		if (!loading && success) {
			onCloseDrawer()
			form.resetFields()
		}
	}, [form, loading, onCloseDrawer, success])
	return (
		<Drawer
			width={375}
			open={
				open && (formKeys ? formKeys?.includes(storeKey) : storeKey === formKey)
			}
			title={params ? "Изменить" : "Добавить"}
			onClose={onCloseDrawer}
			placement={"right"}
			styles={{
				body: {
					paddingBlock: 16
				}
			}}
			footer={
				<Flex gap={8} justify={"end"}>
					<Button onClick={onCloseDrawer}>Отмена</Button>
					<Button loading={loading} type={"primary"} onClick={form.submit}>
						Сохранить
					</Button>
				</Flex>
			}
			{...props}
		/>
	)
}

export { FormDrawer }
