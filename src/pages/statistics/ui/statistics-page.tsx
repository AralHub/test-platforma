import { Card, Col, List, Progress, Row, Tag, Typography } from "antd"
import { useGetExamsStats } from "src/entities/exams"
import { ReloadButton } from "src/shared/ui"
import { PageHeader } from "src/widgets/page-header"

export const StatisticsPage = () => {
	const { data: exams, isLoading, isFetching, refetch } = useGetExamsStats()

	return (
		<>
			<PageHeader
				title={"Статистика"}
				extra={
					<ReloadButton
						loading={isFetching}
						onReload={refetch}
						children={"Обновить"}
					/>
				}
			/>
			<List
				split={false}
				loading={isLoading}
				dataSource={exams?.data}
				renderItem={(item, index) => (
					<List.Item key={index}>
						<Card
							title={item?.user_name}
							style={{
								width: "100%"
							}}
							extra={
								<Tag
									color={"geekblue"}
									bordered={false}
									style={{ fontSize: "inherit" }}
								>
									Попытки: {item.total_attempts}
								</Tag>
							}
						>
							<Row gutter={16} style={{ rowGap: 16, marginBottom: 16 }}>
								{[
									{
										title: "Средний балл",
										value: item?.avg_score_percentage + "%"
									},
									{
										title: "Правильные ответы",
										value: item?.total_correct_answers
									},
									{
										title: "Неправильные ответы",
										value: item?.total_wrong_answers
									},
									{
										title: "Всего вопросов",
										value: item?.total_questions_faced
									},
									{
										title: "Без ответа",
										value: item?.unanswered_questions
									},
									{
										title: "Правильных в среднем",
										value: item?.avg_correct_percentage + "%"
									}
								].map((el) => (
									<Col xs={24} sm={12}>
										<Tag bordered={false} style={{ width: "100%", padding: 12 }}>
											<Typography.Paragraph
												type={"secondary"}
												style={{ textTransform: "uppercase" }}
											>
												{el?.title}
											</Typography.Paragraph>
											<Typography.Title level={4} style={{ fontWeight: 500 }}>
												{el?.value}
											</Typography.Title>
										</Tag>
									</Col>
								))}
							</Row>
							<Typography.Paragraph
								type={"secondary"}
								style={{ textTransform: "uppercase" }}
							>
								Общий прогресс
							</Typography.Paragraph>
							<Progress percent={item?.avg_score_percentage} />
						</Card>
					</List.Item>
				)}
			/>
		</>
	)
}
