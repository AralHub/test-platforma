import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { EN, KK, RU as RUU, UZ } from "src/app/locales"
import { langStorage } from "src/shared/utils"

const RU = {
	translation: Object.keys(EN.translation).reduce(
		(acc, key) => {
			acc[key] = key
			return acc
		},
		{} as Record<string, string>
	)
}

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			RU: {
				translation: {
					...RU.translation,
					...RUU.translation
				}
			},
			UZ,
			EN,
			KK
		},
		lng: langStorage.get().toUpperCase(),
		fallbackLng: langStorage.get().toUpperCase(),
		react: { useSuspense: true },
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	})

export default i18n
