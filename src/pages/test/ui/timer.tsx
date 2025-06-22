import React, { useEffect, useState } from "react"
import { Progress, Typography } from "antd"
import { useToken } from "src/shared/hooks"

const { Text } = Typography

type TimerProps = {
	started_at?: string
	ended_at?: string
}

export const Timer: React.FC<TimerProps> = ({ started_at, ended_at }) => {
	const getSecondsBetween = (start: string, end: string) => {
		const startDate = new Date(start)
		const endDate = new Date(end)
		return Math.floor((endDate.getTime() - startDate.getTime()) / 1000)
	}
	const {
		token: { colorPrimary }
	} = useToken()
	const totalSeconds = getSecondsBetween(started_at!, ended_at!)
	const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingSeconds((prev) => {
				if (prev <= 1) {
					clearInterval(interval)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const percent = (remainingSeconds / totalSeconds) * 100

	const minutes = Math.floor(remainingSeconds / 60)
	const seconds = remainingSeconds % 60

	return (
		<>
			<Progress
				percent={parseFloat(percent.toFixed(1))}
				strokeColor={colorPrimary}
				showInfo={false}
				status={remainingSeconds === 0 ? "success" : "active"}
			/>
			<Text>
				{remainingSeconds === 0
					? "Время истекло"
					: `Осталось: ${minutes}м ${seconds}с`}
			</Text>
		</>
	)
}
