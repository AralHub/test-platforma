import { Flex, Grid, Image } from "antd"
import type { FC, ReactNode } from "react"
import { useToken } from "src/shared/hooks"

const { useBreakpoint } = Grid
interface ResponsiveProps {
	children: ReactNode
}
export const ResponsiveForm: FC<ResponsiveProps> = ({ children }) => {
	const screens = useBreakpoint()
	const isMobile = !screens.md
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
				<Flex justify={"center"}>
					<Image width={250} src={"/logo.png"} preview={false} />
				</Flex>
				<Flex
					vertical={true}
					justify={"center"}
					align={"center"}
					style={{ padding: "48px 24px" }}
				>
					{children}
				</Flex>
			</Flex>
		)
	const imageWidth = screens.xl
		? 350
		: screens.lg
			? 250
			: screens.md
				? 200
				: 150
	return (
		<Flex
			style={{
				width: "100%",
				height: "100vh",
				backgroundColor: colorBgContainer
			}}
			align={"center"}
		>
			<Flex justify={"center"} style={{ width: "50%", padding: 24 }}>
				{children}
			</Flex>
			<Flex
				vertical={true}
				justify={"center"}
				align={"center"}
				style={{
					position: "relative",
					width: "50%",
					backgroundColor: "#161950",
					height: "100vh",
					overflow: "hidden"
				}}
			>
				<Image width={imageWidth} src={"/pro-logo.png"} preview={false} />
				<div
					style={{
						position: "absolute",
						top: 0,
						right: 0
					}}
				>
					<Image
						width={screens.xl ? 450 : 250}
						src={"/assets/grid.svg"}
						fallback={"/public/assets/grid.svg"}
						preview={false}
					/>
				</div>
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0
					}}
				>
					<Image
						width={screens.xl ? 450 : 250}
						src={"/assets/grid.svg"}
						fallback={"/public/assets/grid.svg"}
						preview={false}
					/>
				</div>
			</Flex>
		</Flex>
	)
}
