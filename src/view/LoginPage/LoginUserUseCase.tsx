import { AuthDataDTO } from '@/model/auth.model'
import { UserRegisterDTO } from '@/model/user.model'
import { LoginUserPresenter } from './LoginUserPresenter'

export class LoginUserUseCase {
	private mutate!: (
		authData: AuthDataDTO,
	) => Promise<UserRegisterDTO | undefined>

	constructor(private presenter: LoginUserPresenter) {
		this.presenter = presenter
	}

	incjectMutate(
		mutate: (authData: AuthDataDTO) => Promise<UserRegisterDTO | undefined>,
	) {
		this.mutate = mutate
	}

	handleFieldChange = (field: Partial<AuthDataDTO>) => {
		this.presenter.handleFieldChange(field)
	}

	handleSubmit = async (authData: AuthDataDTO) => {
		const user = await this.mutate(authData)
		if (user) {
			this.presenter.handleSuccess(user)
		}
	}

	handleRedirect = (path: string) => {
		this.presenter.handleRedirect(path)
	}
}
