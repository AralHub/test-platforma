import {
	type DependencyList,
	type EffectCallback,
	useEffect,
	useRef
} from "react"

export function useDebounceEffect(
	fn: EffectCallback,
	deps: DependencyList = [],
	waitTime: number = 500
) {
	const fnRef = useRef(fn)

	// Обновляем текущую ссылку на fn при изменении
	useEffect(() => {
		fnRef.current = fn
	}, [fn])

	useEffect(() => {
		const timeout = setTimeout(() => {
			fnRef.current()
		}, waitTime)

		return () => {
			clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps, waitTime]) // deps — массив литерал, всё ок
}
