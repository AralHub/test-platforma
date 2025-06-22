import { PlusOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { useResponsive } from "antd-style"
import type { ReactNode } from "react"
import { type FC } from "react"
import { type FormKeys, useFormDevtoolsStore } from "src/shared/store"

interface AddButtonProps extends ButtonProps {
	formKey?: FormKeys
	disableForm?: boolean
	text: string
	icon?: ReactNode
}

const AddButton: FC<AddButtonProps> = ({
	formKey,
	disableForm,
	text,
	icon = <PlusOutlined />,
	...props
}) => {
	const { mobile = false } = useResponsive()
	const toggleOpen = useFormDevtoolsStore((state) => state.toggleOpen)
	return (
		<>
			<Button
				type="primary"
				icon={icon}
				size="middle"
				onClick={() => {
					if (disableForm) return

					toggleOpen(formKey)
				}}
			>
				{mobile ? "" : props.children !== undefined ? props.children : text}
			</Button>
		</>
	)
}

export { AddButton }
