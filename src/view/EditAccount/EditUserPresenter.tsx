import { UserWithoutId } from '@/model/user.model'
import { UserDTO } from '@/model/user.model'

type SetUserDTO = ((user: UserDTO) => UserDTO) | UserDTO
export class EditUserPresenter {
	#setUserToEdit!: (user: SetUserDTO) => void
	#setModalOpen!: (open: boolean) => void
	#userToEdit!: UserDTO
	#handleChangeUser!: (user: UserDTO) => void

	injectInputChange(setUserToEdit: (user: SetUserDTO) => void) {
		this.#setUserToEdit = setUserToEdit
	}

	injectModalChange(setModalOpen: (open: boolean) => void) {
		this.#setModalOpen = setModalOpen
	}

	updateField(fieldsToUpdate: Partial<UserWithoutId>) {
		this.#setUserToEdit(prev => ({ ...prev, ...fieldsToUpdate }))
	}

	handleModalOpen() {
		this.handleModalOpenChange(true)
	}

	handleModalClose() {
		this.handleModalOpenChange(false)
	}

	handleModalOpenChange(open: boolean) {
		this.#setModalOpen(open)
	}

	injectUserToEdit(user: UserDTO) {
		this.#userToEdit = user
	}

	getUsername() {
		return this.#userToEdit?.username
	}

	getUserToEdit() {
		return this.#userToEdit
	}

	injectChangeUser(changeUser: (user: UserDTO) => void) {
		this.#handleChangeUser = changeUser
	}

	changeUser(user: UserDTO) {
		this.#handleChangeUser(user)
		this.#setUserToEdit(user)
	}
}
