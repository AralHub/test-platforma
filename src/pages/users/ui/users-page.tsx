import type { TableProps } from "antd"
import { Divider, Flex, Table, Typography } from "antd"
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
						<div key={item.id}>
							{item.title}{" "}
							<Divider
								style={{ margin: "15px 0px", backgroundColor: "#f0f0f0" }}
							/>
						</div>
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
						<div key={item.id}>
							{item.total_time} минут{" "}
							<Divider
								style={{ margin: "15px 0px", backgroundColor: "#f0f0f0" }}
							/>
						</div>
					))}
				</Flex>
			)
		},
		{
			key: "total_score",
			title: "Результат",
			dataIndex: "total_score",
			render: (_, res) => (
				<Flex vertical={true} gap={10}>
					{res.exams.map((item) => (
						<div key={item.id}>
							{item.total_score}{" "}
							<Divider
								style={{ margin: "15px 0px", backgroundColor: "#f0f0f0" }}
							/>
						</div>
					))}
				</Flex>
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
			/>
		</Flex>
	)
}
