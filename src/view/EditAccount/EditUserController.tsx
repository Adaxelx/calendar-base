import { UserWithoutId } from '@/model/user.model'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { UserDTO, UserValidationLogic } from '@/model/user.model'
import Validator from '@/utils/Validator'
import { EditUserUseCase } from './EditUserUseCase'

export class EditUserController {
	#validator: Validator<UserWithoutId>
	constructor(private useCase: EditUserUseCase) {
		this.useCase = useCase
		const userValidationLogic = new UserValidationLogic()
		this.#validator = new Validator(userValidationLogic.validateUser)
	}

	handleFieldChange = (field: keyof UserWithoutId) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			return this.useCase.handleFieldChange({
				[field]: event.target.value,
			})
		}
	}

	injectValidationErrors(
		setValidationErrors: Dispatch<
			SetStateAction<Partial<Record<keyof UserWithoutId, string>>>
		>,
	) {
		this.#validator.injectSetValidationErrors(setValidationErrors)
	}

	handleModalOpen = () => {
		this.useCase.handleModalOpen()
	}

	handleModalClose = () => {
		this.useCase.handleModalClose()
	}

	handleModalOpenChange = (open: boolean) => {
		this.useCase.handleModalOpenChange(open)
	}

	handleSubmit = (user: UserDTO) => async (e: FormEvent) => {
		e.preventDefault()
		await this.useCase.handleEditUser(user, this.#validator.validate)
	}
}
