import { useState } from 'react'
import { ValidationError } from '@/utils/errors'

/** React specific way to return validation state */
export const useValidator = <ValidationObject extends Record<string, unknown>>(
	validator: (data: ValidationObject) => void,
) => {
	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<keyof ValidationObject, string>>
	>({})

	const validate = (data: ValidationObject) => {
		try {
			validator(data)
			return true
		} catch (err: unknown) {
			if (err instanceof ValidationError) {
				const newValidationErrors = {
					[err.field]: err.message,
				} as typeof validationErrors
				setValidationErrors(newValidationErrors)
			}
			return false
		}
	}

	return { validate, validationErrors }
}
