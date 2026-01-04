import { ArrowRightOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import { Button, Card, Flex, List, Progress, Typography } from "antd"
import { useResponsive } from "antd-style"
import { useGetUsersList } from "src/entities/users"
import { ReloadButton } from "src/shared/ui"
import { PageHeader } from "src/widgets/page-header"

export const UsersPage = () => {
	const { data: users, isLoading, isFetching, refetch } = useGetUsersList()
	const { xs } = useResponsive()

	return (
		<>
			<PageHeader
				title={"Результаты"}
				extra={
					<ReloadButton
						loading={isFetching}
						onReload={refetch}
						children={"Обновить"}
					/>
				}
			/>
			<List
				loading={isLoading}
				split={false}
				dataSource={users?.data}
				renderItem={(item, index) => (
					<List.Item key={index}>
						<Card
							style={{ width: "100%" }}
							title={item?.name}
							extra={
								<Link
									to={"/users/$userId"}
									params={{
										userId: `${item?.id}`
									}}
								>
									<Button
										icon={<ArrowRightOutlined />}
										iconPosition={"end"}
										type="primary"
									>
										{xs ? "" : "Результаты"}
									</Button>
								</Link>
							}
						>
							<List
								dataSource={item.exams}
								renderItem={(childItem, index) => {
									const percent = Math.round(
										(childItem?.total_score * 100) / childItem?.questions_count
									)
									return (
										<List.Item key={index}>
											<Flex justify={"space-between"} style={{ width: "100%" }}>
												<div>
													<Typography.Title level={5}>
														{childItem.title}
													</Typography.Title>
													<Typography.Paragraph type={"secondary"}>
														Время: {childItem.total_time} мин
													</Typography.Paragraph>
												</div>
												<Progress
													size={"small"}
													status={
														percent === 0
															? "exception"
															: percent === 100
																? "success"
																: "normal"
													}
													percent={percent}
													format={() =>
														`${childItem?.total_score}/${childItem?.questions_count}`
													}
													type={"circle"}
												/>
											</Flex>
										</List.Item>
									)
								}}
							/>
						</Card>
					</List.Item>
				)}
			/>
		</>
	)
}
