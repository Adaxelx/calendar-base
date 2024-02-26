import { AuthDataDTO } from '@/model/auth.model'
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

export class UserValidationLogic {
	private CONFIG = {
		username: {
			minLength: 4,
		},
		password: {
			minLength: 8,
		},
	}

	private arePasswordsSame({
		password,
		repeatPassword,
	}: Pick<RegisterFields, 'password' | 'repeatPassword'>) {
		if (password !== repeatPassword) {
			throw new ValidationError("Passwords don't match", 'repeatPassword')
		}
	}

	private isPasswordLongEnough({ password }: Pick<RegisterFields, 'password'>) {
		if (password.length < this.CONFIG.password.minLength) {
			throw new ValidationError(
				`Password is too short - min. ${this.CONFIG.password.minLength} characters`,
				'password',
			)
		}
	}

	private isUsernameLongEnough({ username }: Pick<RegisterFields, 'username'>) {
		if (username.length < this.CONFIG.username.minLength) {
			throw new ValidationError(
				`Username is too short - min. ${this.CONFIG.username.minLength} characters`,
				'username',
			)
		}
	}

	public validateRegister = (fields: RegisterFields) => {
		this.isUsernameLongEnough(fields)
		this.isPasswordLongEnough(fields)
		this.arePasswordsSame(fields)
	}

	public validateLogin = (fields: AuthDataDTO) => {
		this.isUsernameLongEnough(fields)
		this.isPasswordLongEnough(fields)
	}
}
