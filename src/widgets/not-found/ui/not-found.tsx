import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons"
import { type NotFoundRouteProps, useRouter } from "@tanstack/react-router"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import type { FlexProps } from "antd/es/flex/interface"
import Result from "antd/es/result"
import Space from "antd/es/space"
import { type FC } from "react"

type NotFoundProps = Omit<FlexProps, "children"> & NotFoundRouteProps

const NotFound: FC<NotFoundProps> = ({ data }) => {
	const router = useRouter()

	return (
		<Flex align={"center"} flex={1} justify={"center"}>
			<Result
				status={"404"}
				title={"404"}
				subTitle={"Страница, которую вы посетили, не существует."}
				children={typeof data === "string" ? data : JSON.stringify(data)}
				extra={
					<Space>
						<Button
							type={"primary"}
							icon={<ArrowLeftOutlined />}
							onClick={() => router.history.back()}
						>
							Назад
						</Button>
						<Button
							type={"link"}
							icon={<HomeOutlined />}
							onClick={() =>
								router.navigate({
									to: "/",
									replace: true
								})
							}
						>
							Главная
						</Button>
					</Space>
				}
			/>
		</Flex>
	)
}

export { NotFound }
