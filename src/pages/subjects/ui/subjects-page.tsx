import { EyeOutlined, FileAddOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { TableColumnsType } from "antd"
import { Button, Flex, Space, Table, Typography, Upload } from "antd"
import { useMemo, type FC } from "react"
import type { Subject } from "src/entities/subjects"
import {
	useCreateSubjectsQuestionFile,
	useDeleteSubjectsMutation,
	useGetSubjectsQuery
} from "src/entities/subjects"
import { SubjectsForm } from "src/features/subjects"
import {
	AddButton,
	DeleteButton,
	EditButton,
	ReloadButton
} from "src/shared/ui"

const { Title } = Typography

export const SubjectsPage: FC = () => {
	const {
		data: subjects,
		isLoading,
		isFetching,
		refetch
	} = useGetSubjectsQuery()

	const { mutate: deleteSubject } = useDeleteSubjectsMutation()
	const { mutate: addFile } = useCreateSubjectsQuestionFile()

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
							<Upload
								showUploadList={false}
								beforeUpload={(file) => {
									addFile({ subject_id: record.id, file })
									return false
								}}
							>
								<Button
									type="primary"
									icon={<FileAddOutlined style={{ fontSize: 20 }} />}
								/>
							</Upload>
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
				<Space>
					<AddButton text="Добавить предмет" />
					<ReloadButton loading={isFetching} onReload={refetch} />
				</Space>
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
