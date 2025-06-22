import { App } from "antd"

export const useMessage = () => {
	const { notification } = App.useApp()

	return {
		message: notification
	}
}
