import { Affix, Button, Flex } from "antd"

type QuestionNavProps = {
	questionIds: string[]
	onSelect: (id: string) => void
	testValues: string[]
	successValues?: string[]
	errorValues?: string[]
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
	questionIds,
	onSelect,
	testValues,
	successValues,
	errorValues,
}) => {
	return (
		<Affix offsetTop={100}>
			<Flex gap={10} wrap={true} style={{
				maxWidth: 720
			}}>
				{questionIds.map((id, index) => (
					<Button
						key={id}
						color={successValues?.includes(id) ? "green" : errorValues?.includes(id) ? "red" : "primary"}
						variant={testValues.some((el) => el == id)  ? "solid" : "outlined"}
						onClick={() => onSelect(id)}
						style={{
							width: 40,
							height: 40,
							borderRadius: 24,
							// opacity: testValues.some((el) => el == id) ? 0.75 : 1
						}}
					>
						{index + 1}
					</Button>
				))}
			</Flex>
		</Affix>
	)
}
