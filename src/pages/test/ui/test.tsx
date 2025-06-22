import { useNavigate, useParams } from "@tanstack/react-router"
import type { RadioChangeEvent } from "antd"
import { App, Button, Card, Flex, Grid, Radio } from "antd"
import { useEffect, useState } from "react"
import { useFinishTest, type Answer } from "src/entities/exam"
import { useGetQuestionsList } from "src/entities/questions"
import { TestResult } from "./test-result"
import { useToken } from "src/shared/hooks"
import { Timer } from "./timer"

const { useBreakpoint } = Grid
const { useApp } = App

export const Test = () => {
	const { testId } = useParams({ strict: false })
	const navigate = useNavigate()
	const [testValues, setTestValues] = useState<Answer[]>([])
	const {
		token: { colorWhite }
	} = useToken()
	const { modal } = useApp()
	const { data: questions } = useGetQuestionsList(testId!)
	const { mutate: finish, data: result, isSuccess } = useFinishTest()
	const screens = useBreakpoint()
	const isMobile = screens.xs || !screens.md
	const onChangeVariant = ({ question_id, option_id }: Answer) => {
		setTestValues((prev) => [
			...prev.filter((val) => val.question_id !== question_id),
			{ question_id, option_id }
		])
	}

	useEffect(() => {
		if (isSuccess) {
			modal.success({
				title: <TestResult total_score={result.data.total_score} />,
				maskClosable: false,
				onOk: () => {
					navigate({ to: "/test", replace: true })
				}
			})
		}
	}, [isSuccess, modal, navigate, result?.data.total_score])

	const onFinishedTest = () => {
		finish({ answers: testValues, exam_id: testId! })
	}

	return (
		<>
			<Timer
				started_at={questions?.data.started_at}
				ended_at={questions?.data.ended_at}
			/>
			<Flex
				vertical={true}
				gap={16}
				style={{
					padding: isMobile ? "8px" : "24px",
					maxWidth: 800,
					margin: "0 auto"
				}}
			>
				{questions?.data.questions.map((item, index) => (
					<Card
						title={
							<span>
								{index + 1}. {item.text}
							</span>
						}
						key={item.id}
						style={{
							width: "100%",
							backgroundColor: colorWhite
						}}
						styles={{
							body: { padding: isMobile ? "8px 12px" : "16px 24px" }
						}}
					>
						<Radio.Group
							onChange={({ target: { value } }: RadioChangeEvent) => {
								onChangeVariant({ question_id: item.id, option_id: value })
							}}
							name={`test-${item.id}`}
							options={item.options.map((variant) => ({
								label: variant.text,
								value: variant.id
							}))}
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 8
							}}
							defaultValue={null}
						/>
					</Card>
				))}
				<Button type="primary" onClick={onFinishedTest}>
					Завершить тест
				</Button>
			</Flex>
		</>
	)
}
