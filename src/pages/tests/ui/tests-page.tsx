import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, Table, Typography, type TableProps } from "antd"
import type { Exam } from "src/entities/exams"
import { useGetExamsSubjects, useStartTest } from "src/entities/exams"

export const TestsPage = () => {
	const { data, isLoading } = useGetExamsSubjects()
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
			render: (value) => <>{value} минут</>
		},
		{
			width: 100,
			fixed: "right",
			key: "options",
			dataIndex: "options",
			title: "",
			render: (_, record) => (
				<Flex>
					{record.passed || record.is_expired ? (
						<>Ваш результат: {record.total_score} правильных</>
					) : (
						<Button
							type="primary"
							onClick={() => {
								startTest(record.id!)
								navigate({
									to: "/tests/$testId",
									params: { testId: String(record.id!) }
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
					<Typography.Title level={2}>Тесты</Typography.Title>
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
