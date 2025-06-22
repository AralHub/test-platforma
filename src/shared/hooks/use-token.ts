import { type GlobalToken, theme as globalTheme } from "antd"
import { type LayoutToken, prepareComponentToken } from "antd/es/layout/style"

const getLayoutToken = prepareComponentToken as (
	token: GlobalToken
) => LayoutToken

export const useToken = () => {
	const { token, theme, hashId } = globalTheme.useToken()
	const darkToken = globalTheme.getDesignToken({
		algorithm: globalTheme.darkAlgorithm
	})
	const layoutToken = getLayoutToken(token)

	// const layoutToken = getLayoutToken(token)

	const globalToken: GlobalToken = {
		...token,
		Layout: {
			...token.Layout,
			...layoutToken
		}
	}

	return { token: globalToken, darkToken, theme, hashId }
}
