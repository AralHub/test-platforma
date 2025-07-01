import { Affix, Button, Flex } from "antd"

type QuestionNavProps = {
	questionIds: string[]
	onSelect: (id: string) => void
	testValues: string[]
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
	questionIds,
	onSelect,
	testValues
}) => {
	return (
		<Affix offsetTop={100}>
			<Flex gap={10}>
				{questionIds.map((id, index) => (
					<Button
						key={id}
						type={testValues.some((el) => el == id) ? "primary" : "default"}
						onClick={() => onSelect(id)}
						style={{
							width: 40,
							height: 40,
							borderRadius: 24,
							opacity: testValues.some((el) => el == id) ? 0.5 : 1
						}}
					>
						{index + 1}
					</Button>
				))}
			</Flex>
		</Affix>
	)
}
