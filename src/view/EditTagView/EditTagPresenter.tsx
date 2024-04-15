import { TagDTO, TagWithoutId } from '@/model/tag.model'

type SetTag = ((prevTag: TagDTO) => TagDTO) | TagDTO
export class EditTagPresenter {
	#setSelectedTag!: (tag: SetTag) => void
	#setModalOpen!: (open: boolean) => void
	#tags!: TagDTO[] | null
	#selectedTag!: TagDTO

	injectInputChange(setSelectedTag: (tag: SetTag) => void) {
		this.#setSelectedTag = setSelectedTag
	}

	injectModalChange(setModalOpen: (open: boolean) => void) {
		this.#setModalOpen = setModalOpen
	}

	updateField(fieldsToUpdate: Partial<TagWithoutId>) {
		this.#setSelectedTag(prev => ({ ...prev, ...fieldsToUpdate }))
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

	handleShowTagsToEdit = () => {
		return this.#tags?.map(tag => ({
			...tag,
			checked: tag.id === this.#selectedTag?.id,
		}))
	}

	injectSelectedTag(tag: TagDTO) {
		this.#selectedTag = tag
	}

	injectTags(tags: TagDTO[] | null) {
		this.#tags = tags
	}

	handleSelectTag(tag: TagDTO) {
		this.#setSelectedTag(tag)
	}

	getSelectedTagWithoutId() {
		const { color, name } = this.#selectedTag
		return { color, name }
	}

	getSelectedTag() {
		return this.#selectedTag
	}

	getIsFormDisabled() {
		return !this.#selectedTag.id
	}
}
