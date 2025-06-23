import {
	BookOutlined,
	CloseOutlined,
	HomeOutlined,
	MenuOutlined,
	UserOutlined
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
import { useEffect, useState } from "react"
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

const itemsAdmin: MenuProps["items"] = [
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
		key: "/users",
		icon: <UserOutlined style={{ fontSize: 16 }} />,
		label: "Результаты"
	}
	// {
	// 	key: "/auth/register",
	// 	icon: <FormOutlined style={{ fontSize: 16 }} />,
	// 	label: "Register"
	// },
	// {
	// 	key: "/auth/login",
	// 	icon: <LoginOutlined style={{ fontSize: 16 }} />,
	// 	label: "Login"
	// }
]

const items: MenuProps["items"] = [
	{
		key: "/test",
		icon: <HomeOutlined style={{ fontSize: 16 }} />,
		label: "Тесты"
	}
]

function RouteComponent() {
	const { mobile } = useResponsive()
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, colorWhite, colorPrimary, sizeMD, sizeXL }
	} = useToken()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { isAuth, role } = useAuth()

	useEffect(() => {
		setCollapsed(mobile ?? false)
	}, [mobile])

	return (
		<Layout hasSider={true}>
			<Sider
				width={295}
				collapsed={collapsed}
				collapsedWidth={0}
				style={
					mobile
						? {
								backgroundColor: colorWhite,
								minHeight: "100vh",
								overflow: "auto",
								position: "fixed",
								zIndex: 1
							}
						: { backgroundColor: colorWhite, minHeight: "100vh" }
				}
			>
				{mobile && (
					<Flex
						onClick={() => setCollapsed(true)}
						justify="flex-end"
						style={{ padding: "20px" }}
					>
						<CloseOutlined style={{ fontSize: sizeXL }} />
					</Flex>
				)}
				<Flex
					align="center"
					style={{
						paddingLeft: 10,
						paddingBottom: "28px",
						paddingTop: "40px",
						paddingRight: 15
					}}
				>
					<Image src={logo} preview={false} width={100} />
					<Flex vertical={true}>
						<Title level={2} style={{ color: colorPrimary }}>
							AralHub
						</Title>
						<Title level={4} style={{ color: colorPrimary }}>
							academy
						</Title>
					</Flex>
				</Flex>
				<Divider style={{ margin: 0 }} />
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
					items={
						(role === "admin" ? itemsAdmin : items)?.map((el) => ({
							...el,
							style: {
								marginBottom: 20
							}
						})) as MenuProps["items"]
					}
				/>
			</Sider>
			<Layout
				style={{
					backgroundColor: colorBgContainer,
					minHeight: "100vh",
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
