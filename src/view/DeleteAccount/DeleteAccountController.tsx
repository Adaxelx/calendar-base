import { DeleteAccountUseCase } from './DeleteAccountUseCase'

export class DeleteAccountController {
	#userId: string | undefined
	constructor(private useCase: DeleteAccountUseCase) {
		this.useCase = useCase
	}

	injectUserId(id: string | undefined) {
		this.#userId = id
	}

	handleDeleteUser = () => {
		this.useCase.deleteUser(this.#userId)
	}
}
