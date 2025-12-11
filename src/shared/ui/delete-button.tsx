import { DeleteOutlined } from "@ant-design/icons"
import { Button, type ButtonProps, Popconfirm } from "antd"
import { type FC } from "react"
import { useToken } from "../hooks"

interface DeleteButtonProps extends ButtonProps {
	title?: string
	data?: string
	onConfirm?: () => void
	okText?: string
	cancelText?: string
}

const DeleteButton: FC<DeleteButtonProps> = ({
	title,
	onConfirm,
	data,
	okText,
	cancelText,
	...props
}) => {
	const { token } = useToken()
	return (
		<>
			<Popconfirm
				title={
					title || (
						<div style={{ width: 300 }}>
							Вы действительно хотите удалить "{data || ""}"?
						</div>
					)
				}
				okText={okText || "Удалить"}
				cancelText={cancelText}
				okButtonProps={{
					danger: true
				}}
				placement={"bottomRight"}
				onConfirm={onConfirm}
			>
				<Button
					type="text"
					icon={<DeleteOutlined />}
					{...props}
					style={{ borderColor: token.red5, color: token.red5 }}
				/>
			</Popconfirm>
		</>
	)
}

export { DeleteButton }
