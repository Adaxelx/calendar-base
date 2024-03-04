import { UserEditDTO } from '@/model/user.model'
import { UserEditFields } from './EditUserUseCase'

type SetUserEditFields =
	| ((user: UserEditFields) => UserEditFields)
	| UserEditFields
export class EditUserPresenter {
	#setUserToEdit!: (user: SetUserEditFields) => void
	#setModalOpen!: (open: boolean) => void
	#userToEdit!: UserEditFields
	#handleChangeUser!: (user: UserEditFields) => void

	injectInputChange(setUserToEdit: (user: SetUserEditFields) => void) {
		this.#setUserToEdit = setUserToEdit
	}

	injectModalChange(setModalOpen: (open: boolean) => void) {
		this.#setModalOpen = setModalOpen
	}

	updateField(fieldsToUpdate: Partial<UserEditDTO>) {
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

	injectChangeUser(changeUser: (user: UserEditFields) => void) {
		this.#handleChangeUser = changeUser
	}

	changeUser(user: UserEditFields) {
		this.#handleChangeUser(user)
		this.#setUserToEdit(user)
	}
}
