import { act, renderHook, waitFor } from '@testing-library/react'
import { useMutation } from '../useMutation'

test('should mutate successfuly', async () => {
	const BODY = { example: 'test' }
	const RESPONSE = { response: 'test' }
	const queryFn = vi.fn().mockImplementation(() => RESPONSE)
	const { result } = renderHook(() => useMutation(queryFn))

	assertIdle(result)

	act(() => {
		result.current.mutate(BODY)
	})

	assertLoading(result)

	await waitFor(() => result.current.isIdle)

	assertIdle(result)

	expect(result.current.data).toBe(RESPONSE)
})

test('should return isError when error is present', async () => {
	const BODY = { example: 'test' }
	const ERROR = new Error('test error')
	const queryFn = vi.fn().mockImplementation(() => {
		throw ERROR
	})
	const { result } = renderHook(() => useMutation(queryFn))

	assertIdle(result)

	act(() => {
		result.current.mutate(BODY)
	})

	await waitFor(() => result.current.isIdle)

	assertError(result)

	expect(result.current.data).toBe(null)
	expect(result.current.error).toBe(ERROR)
})

// helpers

type HookResult = ReturnType<
	typeof renderHook<ReturnType<typeof useMutation>, () => void>
>['result']

const assertLoading = (result: HookResult) => {
	expect(result.current.isIdle).toBe(false)
	expect(result.current.isLoading).toBe(true)
	expect(result.current.isError).toBe(false)
}

const assertIdle = (result: HookResult) => {
	expect(result.current.isIdle).toBe(true)
	expect(result.current.isLoading).toBe(false)
	expect(result.current.isError).toBe(false)
}

const assertError = (result: HookResult) => {
	expect(result.current.isIdle).toBe(false)
	expect(result.current.isLoading).toBe(false)
	expect(result.current.isError).toBe(true)
}
