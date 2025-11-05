import { Card, Flex, Segmented, Select, Space, Typography } from "antd"
import type { EChartsOption } from "echarts"
import EchartsReact from "echarts-for-react"
import { useEffect, useState } from "react"
import type { Stats} from "src/entities/exam"
import { useGetExamList, useGetStats } from "src/entities/exam"
import { formatNumber } from "src/shared/utils"

const { Title } = Typography

const useGetOption = (data: Stats[], mostCurrent: boolean) => {
	const option: EChartsOption = {
		color: ["#113A34"],
		tooltip: {
			show: true,
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			},
			valueFormatter: (value) => `${value}%`
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true
		},
		xAxis: {
			type: "category",
			data: data.map(
				(value, index) =>
					`Вопрос ${index + 1},\nКоличество ${mostCurrent ? "правильных" : "неправильных"} ответов: ${value.count},\nКоличество решении: ${value.total_responses}`
			),
			axisTick: {
				alignWithLabel: true
			}
		},
		yAxis: {
			type: "value",
			max: 100,
			axisLabel: {
				formatter: (value) => `${value}%`
			}
		},
		series: [
			{
				itemStyle: {
					borderRadius: [8, 8, 0, 0]
				},
				barWidth: data.length < 3 ? "40%" : "60%",
				data: data.map((el) => formatNumber(el.percent)),
				type: "bar",
				showBackground: true,
				backgroundStyle: {
					color: "rgba(180, 180, 180, 0.2)"
				}
			}
		]
	}
	return option
}

export const StatisticPage = () => {
	const [variant, setVariant] = useState("1")
	const [exam, setExam] = useState<number>()
	const { data: exams, isLoading: examsLoading } = useGetExamList()
	const { data: stats, isLoading, isFetching } = useGetStats(exam, {
		most_correct: variant === "1"
	})

	const option = useGetOption(stats?.data || [], variant === "1")

	useEffect(() => {
		if (exam) return
		if (exams && exams?.data) {
			const [current] = exams.data
			setExam(current?.id)
		}
	}, [exams, exam])
	return (
		<>
			<Flex justify="space-between" style={{ padding: "20px 0px" }}>
				<Title level={2}>Статистика</Title>
			</Flex>
			<Card
				loading={examsLoading || isLoading}
				title={"Статистика по тестам"}
				extra={
					<Space wrap={true}>
						<Segmented
							value={variant}
							onChange={setVariant}
							options={[
								{
									value: "1",
									label: "Правильные"
								},
								{
									value: "0",
									label: "Неправильные"
								}
							]}
						/>
						<Select
							value={exam}
							onChange={setExam}
							placeholder={"Выберите предмет"}
							loading={isLoading}
							disabled={isLoading}
							options={exams?.data?.map((el) => ({
								value: el.id,
								label: el.title
							}))}
						/>
					</Space>
				}
			>
				<EchartsReact showLoading={isFetching} option={option} />
			</Card>
		</>
	)
}
