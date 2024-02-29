import { UserWithoutId } from '@/model/user.model'
import { UserDTO } from '@/model/user.model'
import { EditUserPresenter } from './EditUserPresenter'

export class EditUserUseCase {
	#refetchUser!: () => void

	#editUserMutation!: (data: UserDTO) => Promise<UserDTO | undefined>
	constructor(private presenter: EditUserPresenter) {
		this.presenter = presenter
	}

	injectRefetchUser(refetchUser: () => void) {
		this.#refetchUser = refetchUser
	}

	injectEditUserMutation(
		editUserMutation: (data: UserDTO) => Promise<UserDTO | undefined>,
	) {
		this.#editUserMutation = editUserMutation
	}

	handleFieldChange(fieldsToUpdate: Partial<UserWithoutId>) {
		this.presenter.updateField(fieldsToUpdate)
	}

	handleModalOpen() {
		this.presenter.handleModalOpen()
	}

	handleModalClose() {
		this.presenter.handleModalClose()
	}

	handleModalOpenChange(open: boolean) {
		this.presenter.handleModalOpenChange(open)
	}

	handleEditUser = async (
		user: UserDTO,
		validate: (data: UserWithoutId) => boolean,
	) => {
		if (!validate(user)) return
		const response = await this.#editUserMutation(user)
		if (!response) return
		this.#refetchUser()
		this.handleModalClose()
		this.presenter.changeUser(response)
	}
}
