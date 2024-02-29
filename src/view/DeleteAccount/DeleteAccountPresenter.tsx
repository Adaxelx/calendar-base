export class DeleteAccountPresenter {
	#logout!: () => void
	constructor() {}
	injectLogout(logout: () => void) {
		this.#logout = logout
	}
	handleLogout = () => {
		this.#logout()
	}
}
