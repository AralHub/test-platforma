import {
	BookOutlined,
	CloseOutlined,
	HomeOutlined,
	InstagramOutlined,
	MenuOutlined,
	OrderedListOutlined,
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
import {
	Divider,
	Drawer,
	Flex,
	Image,
	Layout,
	Menu,
	Space,
	Typography
} from "antd"
import { useResponsive } from "antd-style"
import type { FC, PropsWithChildren } from "react"
import { useEffect, useState } from "react"
import { useAuth, useToken } from "src/shared/hooks"
import logo from "../shared/assets/logo.svg"
import { ProfileAvatar } from "src/widgets/avatar"
import { TelegramFilled } from "src/shared/ui/icons"

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

const { Title, Text } = Typography
const { Header, Content, Footer, Sider } = Layout

const itemsAdmin: MenuProps["items"] = [
	{
		key: "/test",
		icon: <HomeOutlined style={{ fontSize: 16 }} />,
		label: "Тест"
	},
	{
		key: "/exam",
		icon: <BookOutlined style={{ fontSize: 16 }} />,
		label: "Предмет"
	},
	{
		key: "/users",
		icon: <UserOutlined style={{ fontSize: 16 }} />,
		label: "Результат"
	},
	{
		key: "/statistic",
		icon: <OrderedListOutlined style={{ fontSize: 16 }} />,
		label: "Статистика"
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

const SiderbarContainer: FC<
	PropsWithChildren<{
		collapsed: boolean
		toggleCollapsed: () => void
	}>
> = ({ children, collapsed, toggleCollapsed }) => {
	const { mobile } = useResponsive()
	const {
		token: { colorWhite }
	} = useToken()

	if (mobile)
		return (
			<Drawer
				closable={false}
				placement={"left"}
				width={295}
				open={!collapsed}
				onClose={toggleCollapsed}
				styles={{
					body: {
						padding: 0
					}
				}}
			>
				{children}
			</Drawer>
		)

	return (
		<Sider
			width={295}
			collapsed={collapsed}
			collapsedWidth={0}
			style={{
				backgroundColor: colorWhite,
				height: "100vh",
				position: "sticky",
				left: 0,
				top: 0,
				bottom: 0
			}}
		>
			{children}
		</Sider>
	)
}

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
			<SiderbarContainer
				collapsed={collapsed}
				toggleCollapsed={() => setCollapsed((prev) => !prev)}
			>
				{mobile && (
					<Flex
						onClick={() => setCollapsed(false)}
						justify="flex-end"
						style={{ padding: "20px", paddingBottom: 0 }}
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
					<Image
						src={logo}
						preview={false}
						width={100}
						style={{ flexShrink: 0 }}
					/>
					<Flex vertical={true}>
						<Title
							level={2}
							style={{ color: colorPrimary, whiteSpace: "nowrap" }}
						>
							AralHub
						</Title>
						<Title
							level={4}
							style={{ color: colorPrimary, whiteSpace: "nowrap" }}
						>
							academy
						</Title>
					</Flex>
				</Flex>
				<Divider style={{ margin: 0 }} />
				<Menu
					theme="dark"
					onClick={(e) => {
						navigate({ to: e.key })
						if (mobile) {
							setCollapsed(false)
						}
					}}
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
			</SiderbarContainer>
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
				{!mobile && (
					<Footer style={{ padding: "10px 0px", backgroundColor: "inherit" }}>
						<Flex justify="space-between" align="center">
							<Flex align="center" gap={20}>
								<Text style={{ fontSize: "18px", color: colorPrimary }}>
									<Image src={logo} preview={false} width={50} />
									AralHub Academy
								</Text>
							</Flex>
							<Text type="secondary" style={{ fontSize: "13px" }}>
								© {new Date().getFullYear()} AralHub Academy. Все права
								защищены.
							</Text>
							<Space size="large">
								<Title level={5}>
									<Text type="secondary">Телефон: +998913803514</Text>
								</Title>
								<Flex gap={10}>
									<a
										href="https://instagram.com/aralhub"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: "#E1306C" }}
									>
										<InstagramOutlined style={{ fontSize: "22px" }} />
									</a>
									<a
										href="https://t.me/aralhub"
										target="_blank"
										rel="noopener noreferrer"
										style={{ color: "#0088cc" }}
									>
										<TelegramFilled style={{ fontSize: "22px" }} />
									</a>
								</Flex>
							</Space>
						</Flex>
					</Footer>
				)}
			</Layout>
		</Layout>
	)
}
