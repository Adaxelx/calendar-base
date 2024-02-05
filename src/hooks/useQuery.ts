import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function useQuery<T>(queryFn: () => Promise<T>) {
	const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
	const [error, setError] = useState<Error | null>(null)
	const [data, setData] = useState<T | null>(null)

	const callbackRef = useRef(queryFn)

	useLayoutEffect(() => {
		callbackRef.current = queryFn
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				setStatus('loading')
				const responseData = await callbackRef.current?.()
				setData(responseData)
				setStatus('idle')
			} catch (error: unknown) {
				console.log(error)
				setStatus('error')
				if (error instanceof Error) {
					setError(error)
					return
				}
				setError(new Error('An unknown error occurred'))
			}
		}
		fetchData()
	}, [])

	return {
		isLoading: status === 'loading',
		isIdle: status === 'idle',
		isError: status === 'error',
		error,
		data,
	}
}
