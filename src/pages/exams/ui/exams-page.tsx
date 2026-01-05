import {
	CheckOutlined,
	ClockCircleOutlined,
	EyeOutlined,
	LockOutlined,
	QuestionCircleOutlined
} from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import {
	Button,
	Card,
	Col,
	Empty,
	Row,
	Space,
	Spin,
	Switch,
	Typography
} from "antd"
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
import { PageHeader } from "src/widgets/page-header"

export const ExamsPage = () => {
	const { data: exams, isLoading, isFetching, refetch } = useGetExamsList()
	const { token } = useToken()
	const { mutate: deleteExam } = useDeleteExams()
	const { mutate: updateStatus, isPending } = useUpdateStatus()

	return (
		<>
			<PageHeader
				title={"Экзамены"}
				extra={[
					<AddButton text={"Добавить экзамен"} key={"add"} />,
					<ReloadButton
						loading={isFetching}
						onReload={refetch}
						key={"refetch"}
					/>
				]}
			/>
			<Spin spinning={isLoading}>
				{exams?.data?.length ? (
					<Row gutter={24} style={{ rowGap: 24 }}>
						{exams?.data?.map((el, index) => (
							<Col xs={24} sm={12} md={12} lg={12} xl={8} xxl={6} key={index}>
								<Card
									variant={"outlined"}
									actions={[
										<Switch
											key={"status"}
											onClick={() => updateStatus(el.id!)}
											checkedChildren={<CheckOutlined />}
											unCheckedChildren={<LockOutlined />}
											defaultChecked={el.is_active}
											loading={isPending}
										/>,
										<Link
											key={"open"}
											to={"/exams/$examId"}
											params={{ examId: String(el.id!) }}
										>
											<Button
												variant={"outlined"}
												color={"primary"}
												icon={<EyeOutlined />}
											/>
										</Link>,
										<EditButton key={"edit"} params={el} />,
										<DeleteButton
											key={"delete"}
											data={el.title}
											onConfirm={() => deleteExam(el.id!)}
										/>
									]}
								>
									<Typography.Title
										level={3}
										style={{ color: token.colorPrimary, marginBottom: 8 }}
									>
										{el?.title}
									</Typography.Title>
									<Space split={"•"} style={{ marginBottom: 16 }}>
										<div>
											<ClockCircleOutlined /> {el?.time_limit_minutes} мин
										</div>
										<div>
											<QuestionCircleOutlined /> {el?.questions_count} вопросов
										</div>
									</Space>
									<div>
										<Typography.Paragraph
											ellipsis={{
												rows: 4
											}}
											style={{
												height: 100
											}}
										>
											<blockquote>{el.description}</blockquote>
										</Typography.Paragraph>
									</div>
								</Card>
							</Col>
						))}
					</Row>
				) : (
					<Empty />
				)}
			</Spin>
			<ExamsForm />
		</>
	)
}
