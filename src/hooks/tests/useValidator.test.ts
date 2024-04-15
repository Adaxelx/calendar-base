import { act, renderHook } from '@testing-library/react'
import { useValidator } from '../useValidator'
import { ValidationError } from '@/utils/errors'

test('should not return validation errors if error is not thrown', async () => {
	const EXAMPLE_BODY = { example: 'test' }
	const queryFn = vi
		.fn()
		.mockImplementation((data: typeof EXAMPLE_BODY) => data)
	const { result } = renderHook(() => useValidator(queryFn))

	expect(result.current.validationErrors).toStrictEqual({})

	act(() => {
		result.current.validate(EXAMPLE_BODY)
	})

	expect(result.current.validationErrors).toStrictEqual({})
})

test('should return validation errors if error is thrown', async () => {
	const FIELD = 'example'
	const ERROR_CONTENT = 'example error'
	const EXAMPLE_BODY = { [FIELD]: 'test' }

	const ERROR = new ValidationError(ERROR_CONTENT, FIELD)
	const queryFn = vi.fn().mockImplementation(() => {
		throw ERROR
	})
	const { result } = renderHook(() => useValidator(queryFn))

	expect(result.current.validationErrors).toStrictEqual({})

	act(() => {
		result.current.validate(EXAMPLE_BODY)
	})

	expect(result.current.validationErrors).toStrictEqual({
		[FIELD]: ERROR_CONTENT,
	})
})
