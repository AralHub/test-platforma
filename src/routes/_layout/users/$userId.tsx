import { createFileRoute } from "@tanstack/react-router"
import { Badge, Card, Flex, Select, Space, Spin } from "antd"
import { css, cx, useResponsive } from "antd-style"
import { useToken } from "src/shared/hooks"
import { useEffect, useRef, useState } from "react"
import { QuestionNav } from "src/pages/test/ui/question-nav"
import Title from "antd/es/typography/Title"
import { useGetUsersById, useGetUsersByIdAnswers } from "src/entities/users"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useGetExamListByUserId } from "src/entities/exam"

export const Route = createFileRoute("/_layout/users/$userId")({
	component: RouteComponent
})

// const questionList: Questions[] = Array.from({ length: 30 }, (_v, index) => ({
// 	id: index + 1,
// 	options: [
// 		{
// 			id: 1,
// 			text: "Hello 1",
// 			is_correct: false
// 		},
// 		{
// 			id: 2,
// 			text: "Hello 2",
// 			is_correct: false
// 		},
// 		{
// 			id: 3,
// 			text: "Hello 3",
// 			is_correct: true
// 		},
// 		{
// 			id: 4,
// 			text: "Hello 4",
// 			is_correct: false
// 		}
// 	],
// 	text: `hello ${index + 1}?`
// }))

function RouteComponent() {
	const { userId } = Route.useParams()
	const { mobile } = useResponsive()
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const {
		token: { colorWhite }
	} = useToken()
	const [exam, setExam] = useState<number | string>()

	const navigate = Route.useNavigate()
	const { data: user, isLoading } = useGetUsersById(userId)
	const {
		data: userAnswers,
		isLoading: userAnswersLoading,
		isFetching: userAnswersFetching
	} = useGetUsersByIdAnswers(userId, {
		exam_id: exam
	})
	const { data: exams, isLoading: examsLoading } =
		useGetExamListByUserId(userId)

	const handleClick = (key: string) => {
		const ref = sectionRefs.current[key]
		ref?.scrollIntoView({ behavior: "smooth", block: "start" })
	}

	useEffect(() => {
		if (exams && exams.data) {
			const [current] = exams.data
			setExam(current.id)
		}
	}, [exams])
	return (
		<>
			<Flex
				justify="space-between"
				style={{ padding: "20px 0px", rowGap: 8 }}
				wrap={true}
			>
				<Title level={mobile ? 4 : 2}>
					<ArrowLeftOutlined
						style={{ marginRight: 20 }}
						onClick={() => navigate({ to: "/users" })}
					/>
					Результат: {isLoading ? "Загрузка..." : user?.data?.name}
				</Title>
				<Select
					style={
						mobile
							? {
									width: "100%"
								}
							: {}
					}
					placeholder={"Выберите предмет"}
					loading={examsLoading}
					value={exam}
					onChange={setExam}
					disabled={examsLoading}
					options={exams?.data?.map((el) => ({
						value: el.id,
						label: el.title
					}))}
				/>
			</Flex>
			<Flex
				style={{
					width: "100%",
					padding: mobile ? "20px 0px" : "24px 0px"
				}}
				justify="center"
				gap={48}
			>
				{userAnswersLoading || userAnswersFetching ? (
					<Spin spinning={userAnswersLoading || userAnswersFetching}>
						<div style={{ height: 300, width: "100%" }}></div>
					</Spin>
				) : (
					<>
						<Flex
							vertical={true}
							gap={16}
							style={{
								width: mobile ? "100%" : "60%"
							}}
						>
							{userAnswers?.data?.map((item, index) => (
								<Card
									className={cx(css`
										.ant-card-head-title {
											text-overflow: clip;
											white-space: normal;
											padding: 12px 0;
										}
									`)}
									title={
										<span>
											{index + 1}. {item.question_text}
										</span>
									}
									key={index}
									ref={(el) => (sectionRefs.current[item.question_id] = el)}
									style={{
										width: "100%",
										backgroundColor: colorWhite
									}}
									styles={{
										body: { padding: mobile ? "8px 12px" : "16px 24px" }
									}}
								>
									{/* {item.image_url && (
								<Flex justify="center">
									<Image
										width={200}
										height={200}
										src={item.image_url}
										style={{ padding: "20px 0px" }}
									/>
								</Flex>
							)} */}
									<Space direction={"vertical"}>
										{item.options.map((el, index) => (
											<Badge
												key={index}
												status={
													item.selected_option_id === el.option_id
														? item.is_correct
															? "success"
															: "error"
														: "default"
												}
												styles={{
													indicator: {
														width: 16,
														height: 16
													}
												}}
												text={el.option_text}
											/>
										))}
									</Space>
								</Card>
							))}
						</Flex>
						{!mobile && (
							<QuestionNav
								questionIds={
									userAnswers?.data?.map((q) => String(q.question_id)) || []
								}
								onSelect={handleClick}
								testValues={
									userAnswers?.data.map((item) => String(item.question_id)) ||
									[]
								}
								successValues={
									userAnswers?.data
										?.filter((el) => el.is_correct)
										.map((item) => String(item.question_id)) || []
								}
								errorValues={
									userAnswers?.data
										?.filter((el) => !el.is_correct)
										.map((item) => String(item.question_id)) || []
								}
							/>
						)}
					</>
				)}
			</Flex>
		</>
	)
}
