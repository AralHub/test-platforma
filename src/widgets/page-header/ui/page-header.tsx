import { ArrowLeftOutlined } from "@ant-design/icons"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { Breadcrumb, BreadcrumbProps, Flex, Space, Typography } from "antd"
import { useResponsive } from "antd-style"
import type { FC, ReactNode } from "react"

interface PageHeaderProps {
	title?: string
	extra?: ReactNode
	breadcrumb?: BreadcrumbProps["items"]
	showBack?: boolean
	noSpace?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({
	title,
	breadcrumb,
	extra,
	noSpace,
	showBack
}) => {
	const { xs } = useResponsive()
	const { history } = useRouter()

	const titleComp = title ? (
		<Typography.Title level={xs ? 4 : 3}>
			{showBack ? (
				<ArrowLeftOutlined
					style={{ marginRight: 20 }}
					onClick={() => history.back()}
				/>
			) : null}
			{title}
		</Typography.Title>
	) : null
	const extraComp = extra ? (
		noSpace ? (
			extra
		) : (
			<Space wrap={true}>{extra}</Space>
		)
	) : null
	const breadcrumbComp = breadcrumb ? <Breadcrumb items={breadcrumb} /> : null

	return (
		<>
			<Flex justify={"space-between"} align={"center"} wrap={true} gap={8}>
				{breadcrumbComp ? (
					<div>
						{titleComp}
						{breadcrumbComp}
					</div>
				) : (
					titleComp
				)}
				{extraComp ? extraComp : breadcrumbComp}
			</Flex>
		</>
	)
}

export { PageHeader }
