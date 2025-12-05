import { ReloadOutlined } from "@ant-design/icons"
import { Button, type ButtonProps } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"

interface ReloadButtonProps extends ButtonProps  {
	onReload?: () => void
}

const ReloadButton: FC<ReloadButtonProps> = ({
	icon = <ReloadOutlined />,
	onReload,
	onClick,
	...props
}) => {
	const { mobile = false } = useResponsive()

	return (
		<>
			<Button
				type="primary"
				icon={icon}
				size="middle"
				onClick={(e) => {
					onReload?.()
					onClick?.(e)
				}}
				{...props}
				children={mobile ? null : props.children}
			/>
		</>
	)
}

export { ReloadButton }
