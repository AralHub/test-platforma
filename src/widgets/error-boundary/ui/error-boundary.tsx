import { ArrowLeftOutlined, SyncOutlined } from "@ant-design/icons"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { ErrorComponent, useRouter } from "@tanstack/react-router"
import { Button, Flex, Result, Space } from "antd"
import { type FC, useEffect } from "react"

const ErrorBoundary: FC<ErrorComponentProps> = ({ error }) => {
	const queryErrorResetBoundary = useQueryErrorResetBoundary()
	const router = useRouter()

	useEffect(() => {
		queryErrorResetBoundary.reset()
	}, [queryErrorResetBoundary])

	return (
		<Flex justify={"center"} align={"center"} flex={1}>
			<Result
				status={"500"}
				title={"500"}
				subTitle={"Произошла непредвиденная ошибка"}
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
							type={"primary"}
							icon={<SyncOutlined />}
							onClick={() => router.invalidate()}
						>
							Перезагрузить
						</Button>
					</Space>
				}
				children={<ErrorComponent error={error} />}
			/>
		</Flex>
	)
}

export { ErrorBoundary }
