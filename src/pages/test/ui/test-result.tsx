import type { FC } from "react"
import { Typography, Space } from "antd"
import type { TestResult as TestResultType } from "src/entities/exam"

const { Title } = Typography

export const TestResult: FC<TestResultType> = ({ total_score }) => {
	return (
		<Space direction="vertical" size="large">
			<Title level={4} style={{ margin: 0 }}>
				Ваш результат: {total_score} правильных
			</Title>
		</Space>
	)
}
