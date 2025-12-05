import { ArrowLeftOutlined, CameraOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import {
	Button,
	Card,
	Empty,
	Flex,
	Image,
	Space,
	Tag,
	Typography,
	Upload
} from "antd"
import type { FC } from "react"
import {
	useAddImage,
	useDeleteQuestion,
	useGetAdminQuestions
} from "src/entities/questions"
import {
	SubjectGenerationButton,
	SubjectQuestionsForm
} from "src/features/subject-questions"
import { useToken } from "src/shared/hooks"
import { AddButton, DeleteButton, EditButton } from "src/shared/ui"

const { Title } = Typography

export const SubjectQuestionsPage: FC = () => {
	const { subjectId } = useParams({
		strict: false
	})
	const { mutate: deleteQuestion } = useDeleteQuestion()
	const { mutate: addImage } = useAddImage()
	const navigate = useNavigate()
	const {
		token: { colorWhite }
	} = useToken()

	const { data: questions } = useGetAdminQuestions(subjectId, "by_subject")

	return (
		<>
			<Flex justify="space-between" style={{ padding: "20px 0px" }}>
				<Title level={2}>
					<ArrowLeftOutlined
						style={{ marginRight: 20 }}
						onClick={() => navigate({ to: "/subjects" })}
					/>
					Вопросы предмета
				</Title>
				<Space wrap={true}>
					<SubjectGenerationButton />
					<AddButton text="Добавить вопрос" />
				</Space>
			</Flex>
			{questions?.data?.length ? (
				questions?.data?.map((item, index) => (
					<Card
						key={item.id}
						style={{ backgroundColor: colorWhite, marginTop: 20 }}
						title={
							<Flex justify="space-between" align="center" gap={16}>
								<Flex
									gap={10}
									style={{
										whiteSpace: "wrap",
										paddingBlock: 8
									}}
								>
									<span>{index + 1}.</span>
									{item.text}
								</Flex>
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
						{item.image_url && (
							<Flex justify="center">
								<Image
									width={200}
									height={200}
									src={item.image_url}
									style={{ padding: "20px 0px" }}
								/>
							</Flex>
						)}
						<Flex vertical={true} gap={10} style={{ marginTop: 20 }}>
							{item.options.map((question) => (
								<Tag
									style={{ padding: "10px", borderRadius: 5 }}
									key={question.text}
								>
									{question.text}
								</Tag>
							))}
						</Flex>
					</Card>
				))
			) : (
				<Flex
					style={{
						minHeight: 300
					}}
					align={"center"}
					justify={"center"}
				>
					<Empty />
				</Flex>
			)}
			<SubjectQuestionsForm />
		</>
	)
}
