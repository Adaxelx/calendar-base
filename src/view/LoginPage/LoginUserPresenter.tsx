import { AuthDataDTO } from '@/model/auth.model'
import { useUser } from '@/components/UserContext'
import { UserRegisterDTO } from '@/model/user.model'
import { useRoutingHook } from '../Router'

export class LoginUserPresenter {
	#setAuthData!: React.Dispatch<React.SetStateAction<AuthDataDTO>>
	private dispatch!: ReturnType<typeof useUser>['dispatch']
	private handleRouterRedirect!: ReturnType<
		typeof useRoutingHook
	>['handleRedirect']

	injectAuthDataChange(
		setAuthData: React.Dispatch<React.SetStateAction<AuthDataDTO>>,
	) {
		this.#setAuthData = setAuthData
	}

	injectRedirect(
		handleRedirect: ReturnType<typeof useRoutingHook>['handleRedirect'],
	) {
		this.handleRouterRedirect = handleRedirect
	}

	incjectDispatch(dispatch: ReturnType<typeof useUser>['dispatch']) {
		this.dispatch = dispatch
	}

	handleFieldChange = (field: Partial<AuthDataDTO>) => {
		this.#setAuthData(prevState => ({ ...prevState, ...field }))
	}

	handleSuccess = (user: UserRegisterDTO) => {
		this.dispatch({
			type: 'login',
			payload: { token: user.authorized.accessToken, user },
		})
	}

	handleRedirect = (path: string) => {
		this.handleRouterRedirect(path)
	}
}
