import { EyeOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { TableColumnsType } from "antd"
import { Button, Flex, Space, Table, Typography } from "antd"
import { useMemo, type FC } from "react"
import type { Subject } from "src/entities/subjects"
import {
	useDeleteSubjectsMutation,
	useGetSubjectsQuery
} from "src/entities/subjects"
import { SubjectsForm } from "src/features/subjects"
import { AddButton, DeleteButton, EditButton } from "src/shared/ui"

const { Title } = Typography

export const SubjectsPage: FC = () => {
	const { data: subjects, isLoading, isFetching } = useGetSubjectsQuery()

	const { mutate: deleteSubject } = useDeleteSubjectsMutation()

	const columns: TableColumnsType<Subject> = useMemo(
		() =>
			[
				{
					width: 50,
					title: "№",
					key: "index",
					render: (_v, _r, index) => index + 1
				},
				{
					title: "Название",
					dataIndex: "name",
					key: "name"
				},
				{
					width: 50,
					fixed: "right",
					title: "",
					key: "actions",
					render: (_v, record) => (
						<Space>
							<Link
								to={"/subjects/$subjectId"}
								params={{
									subjectId: String(record?.id)
								}}
							>
								<Button icon={<EyeOutlined />} children={"Открыть"} />
							</Link>
							<EditButton params={record} />
							<DeleteButton
								onConfirm={() => {
									deleteSubject(record?.id)
								}}
								data={record?.name}
							/>
						</Space>
					)
				}
			] as TableColumnsType<Subject>,
		[deleteSubject]
	)

	return (
		<>
			<Flex justify="space-between" style={{ padding: "20px 0px" }}>
				<Title level={2}>Предметы</Title>
				<AddButton text="Добавить предмет" />
			</Flex>
			<Table
				dataSource={subjects?.data}
				columns={columns}
				loading={isLoading || isFetching}
			/>
			<SubjectsForm />
		</>
	)
}
