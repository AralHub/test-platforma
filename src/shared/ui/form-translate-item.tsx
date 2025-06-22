import { Form, type FormItemProps, Segmented, Space } from "antd"
import { type FC, useState } from "react"

const FormTranslateItem: FC<FormItemProps> = ({ ...props }) => {
	const [lang, setLang] = useState("ru")

	return (
		<>
			<Form.Item
				label={
					<Space>
						{props.label}
						<Segmented
							value={lang}
							onChange={setLang}
							options={[
								{
									value: "ru",
									label: "Ру"
								},
								{
									value: "en",
									label: "En"
								},
								{
									value: "uz",
									label: "Uz"
								},
								{
									value: "kk",
									label: "Qq"
								}
							]}
						/>
					</Space>
				}
			>
				<Form.Item
					{...props}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					hidden={lang !== "ru"}
					name={props.name + "_ru"}
				/>
				<Form.Item
					{...props}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					hidden={lang !== "en"}
					name={props.name + "_en"}
				/>
				<Form.Item
					{...props}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					hidden={lang !== "uz"}
					name={props.name + "_uz"}
				/>
				<Form.Item
					{...props}
					labelCol={{
						style: {
							display: "none"
						}
					}}
					hidden={lang !== "kk"}
					name={props.name + "_kk"}
				/>
			</Form.Item>
		</>
	)
}

export { FormTranslateItem }
