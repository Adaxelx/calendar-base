import { ValidationError } from '@/utils/errors'

export type RegisterFields = {
	username: string
	password: string
	repeatPassword: string
}

export type RegisterFieldNames = keyof RegisterFields

export type RegisterStateUpdater = <T extends RegisterFieldNames>(
	field: T,
	value: RegisterFields[T],
) => void

const CONFIG = {
	username: {
		minLength: 4,
	},
	password: {
		minLength: 8,
	},
}

const arePasswordsSame = ({
	password,
	repeatPassword,
}: Pick<RegisterFields, 'password' | 'repeatPassword'>) => {
	if (password !== repeatPassword) {
		throw new ValidationError("Passwords don't match", 'repeatPassword')
	}
}

const isPasswordLongEnough = ({
	password,
}: Pick<RegisterFields, 'password'>) => {
	if (password.length < CONFIG.password.minLength) {
		throw new ValidationError(
			`Password is too short - min. ${CONFIG.password.minLength} characters`,
			'password',
		)
	}
}

const isUsernameLongEnough = ({
	username,
}: Pick<RegisterFields, 'username'>) => {
	if (username.length < CONFIG.username.minLength) {
		throw new ValidationError(
			`Username is too short - min. ${CONFIG.username.minLength} characters`,
			'username',
		)
	}
}

export const validateSubmission = (fields: RegisterFields) => {
	isUsernameLongEnough(fields)
	isPasswordLongEnough(fields)
	arePasswordsSame(fields)
}
