import { Link } from "@tanstack/react-router"
import type { TableProps } from "antd"
import { Button, Flex, Table, Typography } from "antd"
import type { Users } from "src/entities/users"
import { useGetUsersList } from "src/entities/users"

const { Title } = Typography

export const UsersPage = () => {
	const { data, isLoading } = useGetUsersList()

	const columns: TableProps<Users>["columns"] = [
		{
			key: "name",
			title: "Пользователь",
			dataIndex: "name"
		},
		{
			key: "title",
			title: "Название предмета",
			dataIndex: "title",
			render: (_, res) => (
				<Flex vertical={true} gap={10}>
					{res.exams.map((item) => (
						<div key={item.id}>{item.title} </div>
					))}
				</Flex>
			)
		},
		{
			key: "total_time",
			title: "Продолжительность",
			dataIndex: "total_time",
			render: (_, res) => (
				<Flex vertical={true} gap={10}>
					{res.exams.map((item) => (
						<div key={item.id}>{item.total_time} минут </div>
					))}
				</Flex>
			)
		},
		{
			align: "center",
			key: "total_score",
			title: "Результат",
			dataIndex: "total_score",
			render: (_, res) => (
				<Flex vertical={true} gap={10}>
					{res.exams.map((item) => (
						<div key={item.id}>{item.total_score} </div>
					))}
				</Flex>
			)
		},
		{
			width: 100,
			fixed: "right",
			key: "options",
			dataIndex: "options",
			title: "",
			render: (_, res) => (
				<Link
					to={"/users/$userId"}
					params={{
						userId: `${res.id}`
					}}
				>
					<Button type="primary">Результаты</Button>
				</Link>
			)
		}
	]

	return (
		<Flex vertical={true}>
			<Flex justify="space-between" style={{ padding: "20px 0px" }}>
				<Title level={2}>Результат</Title>
			</Flex>
			<Table
				style={{ margin: "40px 0px" }}
				columns={columns}
				loading={isLoading}
				dataSource={data?.data}
				rowKey={(rec) => rec.id}
				pagination={false}
				scroll={{
					x: "auto"
				}}
			/>
		</Flex>
	)
}
