import { TagWithoutId } from '@/model/tag.model'
import { Dispatch, SetStateAction } from 'react'
import { ValidationError } from './errors'

export default class Validator<
	ValidationObject extends Record<string, string>,
> {
	private setValidationErrors!: Dispatch<
		SetStateAction<Partial<Record<keyof TagWithoutId, string>>>
	>

	constructor(private validator: (data: ValidationObject) => void) {
		this.validator = validator
	}

	injectSetValidationErrors(
		setValidationErrors: Dispatch<
			SetStateAction<Partial<Record<keyof TagWithoutId, string>>>
		>,
	) {
		this.setValidationErrors = setValidationErrors
	}

	validate = (data: ValidationObject) => {
		try {
			this.validator(data)
			return true
		} catch (err: unknown) {
			if (err instanceof ValidationError) {
				const newValidationErrors = {
					[err.field]: err.message,
				} as ValidationObject
				this.setValidationErrors(newValidationErrors)
			}
			return false
		}
	}
}
