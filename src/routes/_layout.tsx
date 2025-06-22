import {
	BookOutlined,
	FormOutlined,
	HomeOutlined,
	LoginOutlined,
	MenuOutlined
} from "@ant-design/icons"
import {
	createFileRoute,
	Outlet,
	redirect,
	useLocation,
	useNavigate
} from "@tanstack/react-router"
import type { MenuProps } from "antd"
import { Divider, Flex, Image, Layout, Menu, Typography } from "antd"
import { useResponsive } from "antd-style"
import { useState } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import logo from "../shared/assets/logo.svg"
import { ProfileAvatar } from "src/widgets/avatar"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth?.isAuth) {
			throw redirect({
				to: "/auth/login",
				replace: true
			})
		}
	}
})

const { Title } = Typography
const { Header, Content, Footer, Sider } = Layout

const items: MenuProps["items"] = [
	{
		key: "/test",
		icon: <HomeOutlined style={{ fontSize: 16 }} />,
		label: "Тесты"
	},
	{
		key: "/exam",
		icon: <BookOutlined style={{ fontSize: 16 }} />,
		label: "Предметы"
	},
	{
		key: "/auth/register",
		icon: <FormOutlined style={{ fontSize: 16 }} />,
		label: "Register"
	},
	{
		key: "/auth/login",
		icon: <LoginOutlined style={{ fontSize: 16 }} />,
		label: "Login"
	}
]

function RouteComponent() {
	const { mobile } = useResponsive()
	const [collapsed, setCollapsed] = useState(mobile)
	const {
		token: { colorBgContainer, colorWhite, colorPrimary, sizeMD }
	} = useToken()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { isAuth } = useAuth()
	return (
		<Layout hasSider={true}>
			<Sider
				width={295}
				collapsed={collapsed}
				collapsedWidth={0}
				style={{
					backgroundColor: colorWhite,
					height: "100vh"
				}}
			>
				<Flex style={{ padding: "40px 36px 28px" }}>
					<Image src={logo} preview={false} width={100} />
					<Title level={3} style={{ color: colorPrimary }}>
						AralHub Academy
					</Title>
				</Flex>
				<Divider />
				<Menu
					theme="dark"
					onClick={(e) => navigate({ to: e.key })}
					mode="inline"
					style={{
						backgroundColor: colorWhite,
						margin: "20px 0px 80px",
						padding: "8px 36px",
						fontSize: 16
					}}
					defaultSelectedKeys={[pathname]}
					items={items}
				/>
			</Sider>
			<Layout
				style={{
					backgroundColor: colorBgContainer,
					paddingLeft: 30,
					paddingRight: 24
				}}
			>
				<Header
					style={{
						backgroundColor: "inherit",
						height: 100,
						padding: "28px 0px"
					}}
				>
					<Flex justify="space-between">
						<MenuOutlined
							onClick={() => setCollapsed((prev) => !prev)}
							style={{ fontSize: sizeMD, cursor: "pointer" }}
						/>
						{isAuth && <ProfileAvatar />}
					</Flex>
				</Header>
				<Content>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: "center", backgroundColor: "inherit" }}>
					AralHub Academy
				</Footer>
			</Layout>
		</Layout>
	)
}
