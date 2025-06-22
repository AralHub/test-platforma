import { LoadingOutlined } from "@ant-design/icons"
import Spin from "antd/es/spin"
import { type FC } from "react"

interface LoaderProps {
	loading?: boolean
}

const Loader: FC<LoaderProps> = ({ loading }) => {
	return (
		<>
			<Spin
				fullscreen={true}
				spinning={loading}
				indicator={<LoadingOutlined style={{ fontSize: 32, color: "#fff" }} />}
			/>
		</>
	)
}

export { Loader }
