import { CheckOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { TableProps } from "antd"
import { Button, Flex, Space, Switch, Table, Tag, Typography } from "antd"
import type { Exam } from "src/entities/exams"
import {
	useDeleteExams,
	useGetExamsList,
	useUpdateStatus
} from "src/entities/exams"
import { ExamsForm } from "src/features/exams"
import { useToken } from "src/shared/hooks"
import {
	AddButton,
	DeleteButton,
	EditButton,
	ReloadButton
} from "src/shared/ui"

const { Title } = Typography

export const ExamsPage = () => {
	const { data, isLoading, isFetching, refetch } = useGetExamsList()
	const {
		token: { colorPrimary }
	} = useToken()
	const { mutate: deleteExam } = useDeleteExams()
	const { mutate: updateStatus, isPending } = useUpdateStatus()

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
					<Link to={"/exams/$examId"} params={{ examId: String(res.id!) }}>
						<Button
							icon={
								<EyeOutlined style={{ fontSize: 20, color: colorPrimary }} />
							}
						/>
					</Link>
					<EditButton params={res} />
					<DeleteButton
						data={res.title}
						onConfirm={() => deleteExam(res.id!)}
					/>
				</Flex>
			)
		}
	]

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>Экзамены</Title>
					<Space>
						<AddButton text="Добавить экзамен" />
						<ReloadButton loading={isFetching} onReload={refetch} />
					</Space>
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
			<ExamsForm />
		</>
	)
}
