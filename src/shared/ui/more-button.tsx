import {
	CheckCircleOutlined,
	CloseOutlined,
	DeleteOutlined,
	EditFilled,
	EyeOutlined,
	MoreOutlined
} from "@ant-design/icons"
import { App, Button, Dropdown } from "antd"
import type { MenuItemType } from "antd/es/menu/interface"
import { type FC, type ReactNode, useCallback, useMemo } from "react"

interface MoreButtonProps {
	onEdit?: () => void
	confirm?: {
		title: string
		content?: ReactNode
		onConfirm: () => void
	}
	onOpen?: () => void
	onComplete?: () => void
	onCancel?: () => void
}

const MoreButton: FC<MoreButtonProps> = ({
	onEdit,
	confirm,
	onOpen,
	onComplete,
	onCancel
}) => {
	const { modal } = App.useApp()

	const onDelete = useCallback(() => {
		if (!confirm) return
		modal.confirm({
			title: confirm?.title,
			content: confirm?.content,
			onOk: confirm.onConfirm,
			centered: true,
			okButtonProps: {
				danger: true
			},
			okText: "Удалить"
		})
	}, [confirm, modal])

	const menuItems = useMemo(() => {
		const items: MenuItemType[] = []

		if (onOpen) {
			items.push({
				key: "open",
				label: "Открыть",
				icon: <EyeOutlined />,
				onClick: onOpen
			})
		}

		if (onEdit) {
			items.push({
				key: "edit",
				label: "Изменить",
				icon: <EditFilled />,
				onClick: onEdit
			})
		}

		if (onComplete) {
			items.push({
				key: "complete",
				label: "Завершить",
				style: {
					color: "green"
				},
				icon: <CheckCircleOutlined />,
				onClick: onComplete
			})
		}

		if (onCancel) {
			items.push({
				key: "cancel",
				label: "Отменить",
				danger: true,
				icon: <CloseOutlined />,
				onClick: onCancel
			})
		}

		if (confirm) {
			items.push({
				key: "delete",
				danger: true,
				label: "Удалить",
				icon: <DeleteOutlined />,
				onClick: onDelete
			})
		}

		return items
	}, [confirm, onCancel, onComplete, onDelete, onEdit, onOpen])

	return (
		<>
			<Dropdown
				trigger={["click"]}
				menu={{
					items: menuItems
				}}
			>
				<Button
					iconPosition={"end"}
					type={"text"}
					icon={<MoreOutlined style={{ fontSize: 24 }} />}
					key={"link"}
				/>
			</Dropdown>
		</>
	)
}

export { MoreButton }
