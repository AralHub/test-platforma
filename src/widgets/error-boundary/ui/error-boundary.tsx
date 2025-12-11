import { ArrowLeftOutlined, SyncOutlined } from "@ant-design/icons"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { ErrorComponent, useRouter } from "@tanstack/react-router"
import { Button, Flex, Result, Space } from "antd"
import { type FC, useEffect } from "react"
import type { ResponseError } from "src/shared/api"
import { useAuth } from "src/shared/hooks"

const ErrorBoundary: FC<ErrorComponentProps> = ({ error }) => {
	const queryErrorResetBoundary = useQueryErrorResetBoundary()
	const router = useRouter()
	const { logout } = useAuth()
	const responseError = error as ResponseError

	useEffect(() => {
		queryErrorResetBoundary.reset()
		if (responseError?.status === 401) {
			logout()
			router.navigate({
				to: "/auth/login",
				replace: true,
				ignoreBlocker: true,
			})
		}
	}, [logout, queryErrorResetBoundary, responseError?.status, router])

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
