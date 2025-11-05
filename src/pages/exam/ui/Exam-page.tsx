import { CheckOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import type { TableProps } from "antd"
import { Button, Flex, Switch, Table, Tag, Typography } from "antd"
import type { Exam } from "src/entities/exam"
import {
	useDeleteExam,
	useGetExamList,
	useUpdateStatus
} from "src/entities/exam"
import { ExamForm } from "src/features/exam"
import { useToken } from "src/shared/hooks"
import { AddButton, DeleteButton, EditButton } from "src/shared/ui"

const { Title } = Typography

export const ExamPage = () => {
	const { data, isLoading } = useGetExamList()
	const {
		token: { colorPrimary }
	} = useToken()
	const { mutate: deleteExam } = useDeleteExam()
	const { mutate: updateStatus, isPending } = useUpdateStatus()
	const navigate = useNavigate()

	const columns: TableProps<Exam>["columns"] = [
		{
			title: "Название предмета",
			dataIndex: "title",
			key: "name"
		},
		{
			title: "Статус",
			dataIndex: "is_active",
			key: "is_active",
			render: (status) => (
				<>
					{status ? (
						<Tag color="green">Активный</Tag>
					) : (
						<Tag color="red">Не активен</Tag>
					)}
				</>
			)
		},
		{
			title: "Описание",
			dataIndex: "description",
			key: "description"
		},
		{
			title: "Время на тест",
			dataIndex: "time_limit_minutes",
			key: "time_limit_minutes",
			render: (item) => <>{item} минут</>
		},
		{
			width: 100,
			fixed: "right",
			align: "center",
			title: "Функции",
			dataIndex: "functions",
			key: "functions",
			render: (_, res) => (
				<Flex gap={10} align="center">
					<Switch
						onClick={() => updateStatus(res.id!)}
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<LockOutlined />}
						defaultChecked={res.is_active}
						loading={isPending}
					/>
					<EditButton params={res} />
					<DeleteButton
						data={res.title}
						onConfirm={() => deleteExam(res.id!)}
					/>
					<Button
						onClick={() =>
							navigate({
								to: "/exam/$exam_id",
								params: { exam_id: String(res.id!) }
							})
						}
						icon={<EyeOutlined style={{ fontSize: 20, color: colorPrimary }} />}
					/>
				</Flex>
			)
		}
	]

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>Предметы</Title>
					<AddButton text="Добавить предмет" />
				</Flex>
				<Table
					style={{ margin: "40px 0px" }}
					columns={columns}
					loading={isLoading}
					dataSource={data?.data}
					rowKey={(rec) => rec.title}
					scroll={{
						x: "auto"
					}}
					pagination={false}
				/>
			</Flex>
			<ExamForm />
		</>
	)
}
