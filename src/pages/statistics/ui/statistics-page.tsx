import type { TableColumnsType } from "antd"
import { Flex, Typography, Table } from "antd"
import type { Stats } from "src/entities/exams"
import { useGetExamsStats } from "src/entities/exams"
import { ReloadButton } from "src/shared/ui"

const { Title } = Typography

export const StatisticsPage = () => {
	const { data, isLoading, isFetching, refetch } = useGetExamsStats()

	const columns: TableColumnsType<Stats> = [
		{ key: "user_name", dataIndex: "user_name", title: "Имя" },
		{
			key: "total_attempts",
			dataIndex: "total_attempts",
			title: "Попытки"
		},
		{
			key: "avg_score_percentage",
			dataIndex: "avg_score_percentage",
			title: "Средний балл",
			render: (v) => <>{v}%</>
		},
		{
			key: "total_correct_answers",
			dataIndex: "total_correct_answers",
			title: "Правильные"
		},
		{
			key: "total_wrong_answers",
			dataIndex: "total_wrong_answers",
			title: "Неправильные"
		},
		{
			key: "unanswered_questions",
			dataIndex: "unanswered_questions",
			title: "Без ответа"
		},
		{
			key: "avg_correct_percentage",
			dataIndex: "avg_correct_percentage",
			title: "Правильных в среднем",
			render: (v) => <>{v}%</>
		}
	]
	return (
		<>
			<Flex justify="space-between" style={{ padding: "20px 0px" }}>
				<Title level={2}>Статистика</Title>
				<ReloadButton loading={isFetching} onReload={refetch} children={"Обновить"} />
			</Flex>
			<Table
				style={{ margin: "40px 0px" }}
				columns={columns}
				loading={isLoading}
				dataSource={data?.data}
				rowKey={(rec) => rec.user_id}
				scroll={{
					x: "auto"
				}}
				pagination={false}
			/>
		</>
	)
}
