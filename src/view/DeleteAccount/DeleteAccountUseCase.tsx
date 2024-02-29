import { DeleteAccountPresenter } from './DeleteAccountPresenter'

export class DeleteAccountUseCase {
	#deleteMutation!: (data: string) => Promise<object | undefined>
	constructor(private presenter: DeleteAccountPresenter) {
		this.presenter = presenter
	}
	injectDeleteMutation = (
		mutate: (data: string) => Promise<object | undefined>,
	) => {
		this.#deleteMutation = mutate
	}

	deleteUser = async (userId: string | undefined) => {
		if (!userId) throw new Error('missing userId')
		await this.#deleteMutation(userId)
		this.presenter.handleLogout()
	}
}
