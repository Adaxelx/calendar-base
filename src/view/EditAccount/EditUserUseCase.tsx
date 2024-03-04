import { UserEditDTO } from '@/model/user.model'
import { UserDTO } from '@/model/user.model'
import { EditUserPresenter } from './EditUserPresenter'

export type UserEditFields = UserDTO & { password: string }
export class EditUserUseCase {
	#refetchUser!: () => void

	#editUserMutation!: (
		data: UserEditFields,
	) => Promise<UserEditFields | undefined>
	constructor(private presenter: EditUserPresenter) {
		this.presenter = presenter
	}

	injectRefetchUser(refetchUser: () => void) {
		this.#refetchUser = refetchUser
	}

	injectEditUserMutation(
		editUserMutation: (
			data: UserEditFields,
		) => Promise<UserEditFields | undefined>,
	) {
		this.#editUserMutation = editUserMutation
	}

	handleFieldChange(fieldsToUpdate: Partial<UserEditDTO>) {
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
		user: UserEditFields,
		validate: (data: UserEditDTO) => boolean,
	) => {
		if (!validate(user)) return
		const response = await this.#editUserMutation(user)
		if (!response) return
		this.#refetchUser()
		this.handleModalClose()
		this.presenter.changeUser(response)
	}
}
