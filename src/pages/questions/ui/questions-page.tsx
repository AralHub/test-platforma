import { CameraOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Button, Card, Flex, Image, Radio, Typography, Upload } from "antd"
import {
	useAddImage,
	useDeleteQuestion,
	useGetQuestionsList
} from "src/entities/questions"
import { QuestionsForm } from "src/features/questions"
import { useToken } from "src/shared/hooks"
import { AddButton, DeleteButton, EditButton } from "src/shared/ui"

const { Title } = Typography

export const QuestionsPage = () => {
	const { exam_id } = useParams({ strict: false })
	const {
		token: { colorWhite }
	} = useToken()
	const { data } = useGetQuestionsList(exam_id!)
	const { mutate: deleteQuestion } = useDeleteQuestion()
	const { mutate: addImage } = useAddImage()

	return (
		<>
			<Flex vertical={true}>
				<Flex justify="space-between" style={{ padding: "20px 0px" }}>
					<Title level={2}>Вопросы</Title>
					<AddButton text="Добавить предмет" />
				</Flex>
				{data?.data.map((item) => (
					<Card
						key={item.id}
						style={{ backgroundColor: colorWhite }}
						title={
							<Flex justify="space-between" align="center">
								<span>{item.text}</span>
								<Flex gap={10}>
									<EditButton params={item} />
									<Upload
										showUploadList={false}
										beforeUpload={(file) => {
											addImage({ question_id: item.id, image: file })
											return false
										}}
									>
										<Button
											type="primary"
											icon={<CameraOutlined style={{ fontSize: 20 }} />}
										/>
									</Upload>
									<DeleteButton
										data={item.text}
										onClick={() => deleteQuestion(String(item.id))}
									/>
								</Flex>
							</Flex>
						}
					>
						{item.image_url && <Image src={item.image_url} />}
						<Radio.Group
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
			</Flex>
			<QuestionsForm />
		</>
	)
}
