import { TagDTO, TagValidationLogic, TagWithoutId } from '@/model/tag.model'
import Validator from '@/utils/Validator'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { EditTagUseCase } from './EditTagUseCase'

// Presenter powinien mieć stan
// Controller nie ma stanu, obsługuje akcje użytkownika
// przepływ => zmiana w inpucie -> funkcja kontrolera jest wywołana -> aktualizacja danych w use case -> use case przekazuje dane do prezentera -> aktualizacja stanu -> aktualizacja widoku

export class EditTagController {
	#validator: Validator<TagWithoutId>
	constructor(private useCase: EditTagUseCase) {
		this.useCase = useCase
		const tagValidationLogic = new TagValidationLogic()
		this.#validator = new Validator(tagValidationLogic.validateTag)
	}

	handleFieldChange = (field: keyof TagWithoutId) => {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			return this.useCase.handleFieldChange({
				[field]: event.target.value,
			})
		}
	}

	injectValidationErrors(
		setValidationErrors: Dispatch<
			SetStateAction<Partial<Record<keyof TagWithoutId, string>>>
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

	handleSelectTag = (tag: TagDTO) => () => {
		this.useCase.handleSelectTag(tag)
	}

	handleSubmit = (tag: TagDTO) => async (e: FormEvent) => {
		e.preventDefault()
		await this.useCase.handleEditTag(tag, this.#validator.validate)
	}
}
