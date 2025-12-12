import { Flex, Grid, Image } from "antd"
import { useToken } from "src/shared/hooks"
import type { FC, ReactNode } from "react"

const { useBreakpoint } = Grid
interface ResponsiveProps {
	children: ReactNode
}
export const ResponsiveForm: FC<ResponsiveProps> = ({ children }) => {
	const screens = useBreakpoint()
	const isMobile = screens.xs
	const {
		token: { colorBgContainer }
	} = useToken()
	if (isMobile)
		return (
			<Flex
				style={{
					width: "100%",
					height: "100vh",
					backgroundColor: colorBgContainer
				}}
				vertical={true}
			>
				<Flex justify="start">
					<Image src={"/logo.png"} preview={false} />
				</Flex>
				<Flex vertical={true} style={{ padding: "50px 25px" }}>
					{children}
				</Flex>
			</Flex>
		)
	const imageWidth = screens.xl
		? 700
		: screens.lg
			? 500
			: screens.md
				? 350
				: 250
	return (
		<Flex
			style={{
				width: "100%",
				height: "100vh",
				backgroundColor: colorBgContainer
			}}
			align="center"
		>
			<Flex justify="center" style={{ width: "50%" }}>
				{children}
			</Flex>
			<Flex
				vertical={true}
				justify="center"
				align="center"
				style={{
					width: "50%",
					backgroundColor: "#BEEDFF",
					height: "100vh",
					overflow: "hidden"
				}}
			>
				<Image width={imageWidth - 250} src={"/logo.png"} preview={false} />
			</Flex>
		</Flex>
	)
}
