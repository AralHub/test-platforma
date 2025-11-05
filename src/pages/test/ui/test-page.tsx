import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, Table, Typography, type TableProps } from "antd"
import type { Exam } from "src/entities/exam"
import { useGetExamSubjects, useStartTest } from "src/entities/exam"

export const TestPage = () => {
	const { data, isLoading } = useGetExamSubjects()
	const navigate = useNavigate()
	const { mutate: startTest } = useStartTest()

	const columns: TableProps<Exam>["columns"] = [
		{
			key: "title",
			dataIndex: "title",
			title: "Предмет"
		},
		{
			key: "time",
			dataIndex: "time_limit_minutes",
			title: "Время на тест",
			render: (time) => <>{time} минут</>
		},
		{
			width: 100,
			fixed: "right",
			key: "options",
			dataIndex: "options",
			title: "",
			render: (_, res) => (
				<Flex>
					{res.passed || res.is_expired ? (
						<>Ваш результат: {res.total_score} правильных</>
					) : (
						<Button
							type="primary"
							onClick={() => {
								startTest(res.id!)
								navigate({
									to: "/test/$testId",
									params: { testId: String(res.id!) }
								})
							}}
						>
							Начать тест
						</Button>
					)}
				</Flex>
			)
		}
	]

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Typography.Title level={2}>Предметы</Typography.Title>
				</Flex>
				<Table
					style={{ margin: "40px 0px" }}
					columns={columns}
					loading={isLoading}
					dataSource={data?.data}
					rowKey={(rec) => rec.title}
					pagination={false}
					scroll={{
						x: "auto"
					}}
				/>
			</Flex>
		</>
	)
}
