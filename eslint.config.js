import js from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			react,
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true }
			],
			"no-tabs": 0,
			"no-console": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" }
			],
			"react/jsx-key": ["error"],
			"react/jsx-boolean-value": ["error", "always"],
			semi: ["error", "never"],
			quotes: ["error", "double", { allowTemplateLiterals: true }],
			"@typescript-eslint/consistent-type-imports": "error"
		}
	}
)
