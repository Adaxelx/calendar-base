import { TagDTO, TagWithoutId } from '@/model/tag.model'
import { EditTagPresenter } from '../../view/EditTagView/EditTagPresenter'

export class EditTagUseCase {
	#refetchTags!: () => void
	#clearForm!: () => void
	#editTagMutation!: (data: TagDTO) => Promise<TagDTO | undefined>
	constructor(private presenter: EditTagPresenter) {
		this.presenter = presenter
	}

	injectRefetchTags(refetchTags: () => void) {
		this.#refetchTags = refetchTags
	}

	injectClearForm(clearForm: () => void) {
		this.#clearForm = clearForm
	}

	injectEditTagMutation(
		editTagMutation: (data: TagDTO) => Promise<TagDTO | undefined>,
	) {
		this.#editTagMutation = editTagMutation
	}

	handleFieldChange(fieldsToUpdate: Partial<TagWithoutId>) {
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

	handleSelectTag(tag: TagDTO) {
		this.presenter.handleSelectTag(tag)
	}

	handleEditTag = async (
		tag: TagDTO,
		validate: (data: TagWithoutId) => boolean,
	) => {
		if (!validate(tag)) return
		const response = await this.#editTagMutation(tag)
		if (!response) return
		this.#refetchTags()
		this.handleModalClose()
		this.#clearForm()
	}
}
