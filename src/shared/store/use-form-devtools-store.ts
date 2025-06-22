import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type FormParams = Record<string, unknown>

export const FormKeys = {
	MAIN: "main",
	PRIMARY: "primary",
	SECONDARY: "secondary",
	TERTIARY: "tertiary"
} as const

export type FormKeys = (typeof FormKeys)[keyof typeof FormKeys]

interface FormDevtoolsStore {
	open: boolean
	formKey: FormKeys
	toggleOpen: (key?: FormKeys) => void
	params: FormParams | null
	setParams: (params: FormParams, key?: FormKeys) => void
	getParams: <T extends FormParams = FormParams>() => T | null
	resetParams: () => void
}

const useFormDevtoolsStore = create(
	devtools<FormDevtoolsStore>(
		(set, get) => ({
			open: false,
			formKey: "main",
			toggleOpen: (key = FormKeys.MAIN) =>
				set((prev) => ({ open: !prev.open, formKey: key || FormKeys.MAIN })),
			params: null,
			setParams: (params, key = FormKeys.MAIN) =>
				set({ params, open: true, formKey: key }),
			getParams: <T extends FormParams = FormParams>() => {
				const { params } = get()
				if (!params) return null
				return params as T
			},
			resetParams: () => set({ open: false, params: null, formKey: "main" })
		}),
		{
			name: "form",
			anonymousActionType: "form"
		}
	)
)

export { useFormDevtoolsStore }
