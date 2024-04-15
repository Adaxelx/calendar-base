import { UserDTO } from '@/model/user.model'
import { UserEditFields } from './EditUserUseCase'

type SetUserEditFields = (
	user: ((user: UserEditFields) => UserEditFields) | UserEditFields,
) => void
export class EditUserPresenter {
	#setUserToEdit!: SetUserEditFields
	#setModalOpen!: (open: boolean) => void
	#userToEdit!: UserEditFields
	#handleChangeUser!: (user: UserDTO) => void

	injectInputChange(setUserToEdit: SetUserEditFields) {
		this.#setUserToEdit = setUserToEdit
	}

	injectModalChange(setModalOpen: (open: boolean) => void) {
		this.#setModalOpen = setModalOpen
	}

	updateField(fieldsToUpdate: Partial<UserEditFields>) {
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

	injectUserToEdit(user: UserEditFields) {
		this.#userToEdit = user
	}

	getUsername() {
		return this.#userToEdit?.username
	}

	getPassword() {
		return this.#userToEdit?.password
	}

	getUserToEdit() {
		return this.#userToEdit
	}

	injectChangeUser(changeUser: (user: UserDTO) => void) {
		this.#handleChangeUser = changeUser
	}

	changeUser(user: UserDTO) {
		this.#handleChangeUser(user)
		this.#setUserToEdit({ ...user, password: '' })
	}
}
