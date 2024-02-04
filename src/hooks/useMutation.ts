import { useCallback, useState } from 'react'

/** React specific way to interact with backend */
export const useMutation = <InputData, ResponseData>(
	mutation: (data: InputData) => ResponseData,
) => {
	const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
	const [error, setError] = useState<Error | null>(null)
	const [data, setData] = useState<ResponseData | null>(null)

	const mutate = useCallback(
		async (data: InputData) => {
			try {
				setStatus('loading')
				const responseData = await mutation(data)
				setData(responseData)
				setStatus('idle')
				return responseData
			} catch (error: unknown) {
				setStatus('error')
				if (error instanceof Error) {
					setError(error)
					return
				}
				setError(new Error('An unknown error occurred'))
			}
		},
		[mutation],
	)

	return {
		mutate,
		isLoading: status === 'loading',
		isIdle: status === 'idle',
		isError: status === 'error',
		error,
		data,
	}
}
