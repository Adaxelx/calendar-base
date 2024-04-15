import { AuthDataDTO } from '@/model/auth.model'
import { UserValidationLogic } from '@/use-cases/CreateAccount'
import Validator from '@/utils/Validator'
import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginUserController {
	private useCase: LoginUserUseCase
	private validator: Validator<AuthDataDTO>

	constructor(useCase: LoginUserUseCase) {
		this.useCase = useCase
		const userValidationLogic = new UserValidationLogic()
		this.validator = new Validator(userValidationLogic.validateLogin)
	}

	injectSetValidationErrors = (
		setValidationErrors: React.Dispatch<
			React.SetStateAction<Partial<Record<keyof AuthDataDTO, string>>>
		>,
	) => {
		this.validator.injectSetValidationErrors(setValidationErrors)
	}

	handleFieldChange = (field: keyof AuthDataDTO) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			return this.useCase.handleFieldChange({
				[field]: event.target.value,
			})
		}
	}

	handleRegisterRedirect = () => {
		this.useCase.handleRedirect('/register')
	}

	handleSubmitClick =
		(authData: AuthDataDTO) => (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			this.validator.validate(authData)
			this.useCase.handleSubmit(authData)
		}
}
