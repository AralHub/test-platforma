import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import type { ButtonProps } from "antd"
import { Button, ConfigProvider, Spin } from "antd"
import { type FC } from "react"
import { useGenerateQuestion } from "src/entities/questions"
import { MagicOutlined } from "src/shared/ui/icons"

export const SubjectGenerationButton: FC<ButtonProps> = (props) => {
	const { subjectId } = useParams({
		strict: false
	})
	const queryClient = useQueryClient()

	const { mutate: generate, isPending } = useGenerateQuestion()

	return (
		<>
			<ConfigProvider
				spin={{
					indicator: undefined
				}}
			>
				<Spin
					size={"large"}
					spinning={isPending}
					style={{ color: "#fff", fontSize: 64 }}
					percent={"auto"}
					fullscreen={true}
				/>
			</ConfigProvider>
			<Button
				icon={<MagicOutlined />}
				type={"primary"}
				onClick={() => {
					generate(
						{
							id: subjectId,
							count: 10
						},
						{
							onSuccess: () => {
								queryClient.refetchQueries({
									queryKey: ["admin-questions"]
								})
							}
						}
					)
				}}
				children={"Сгенерировать"}
				// loading={isPending}
				{...props}
			/>
		</>
	)
}
