import { createGlobalStyle } from "antd-style"

export const GlobalStyles = createGlobalStyle`
	html {
		scrollbar-color: ${(token) => token.theme.colorBorder} transparent;
	}
`
