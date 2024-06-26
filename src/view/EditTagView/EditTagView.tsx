import Button from '@/components/Button'
import Modal from '@/components/Modal'
import TagFilter from '@/components/TagFilter'
import TagForm from '@/components/TagForm'
import { useMutation } from '@/hooks/useMutation'

import { TagDTO, TagWithoutId, editTag, useTagsQuery } from '@/model/tag.model'

import { useState } from 'react'
import { EditTagPresenter } from './EditTagPresenter'
import { EditTagUseCase } from './EditTagUseCase'
import { EditTagController } from './EditTagController'
import DeleteTag from '../DeleteTag/DeleteTag'

const presenter = new EditTagPresenter()
const useCase = new EditTagUseCase(presenter)
const controller = new EditTagController(useCase)

export default function EditTagView() {
	const { isModalOpen, validationErrors, refetchTags } = useEditTag()
	return (
		<Modal
			isOpen={isModalOpen}
			handleOpenChange={controller.handleModalOpenChange}
			trigger={
				<Modal.Trigger asChild>
					<Button className="w-full" onClick={controller.handleModalOpen}>
						Edit tags
					</Button>
				</Modal.Trigger>
			}
		>
			<h1>Edit tag</h1>
			<section className="flex wrap gap-3">
				{presenter
					.handleShowTagsToEdit()
					?.map(({ checked, id, color, name }) => (
						<TagFilter
							key={id}
							color={color}
							checked={checked}
							onClick={controller.handleSelectTag({ id, color, name })}
						>
							{name}
						</TagFilter>
					))}
			</section>
			<TagForm
				isFormDisabled={presenter.getIsFormDisabled()}
				handleChange={controller.handleFieldChange}
				tag={presenter.getSelectedTagWithoutId()}
				validationErrors={validationErrors}
				handleSubmit={controller.handleSubmit(presenter.getSelectedTag())}
				actions={
					<DeleteTag
						refetchTags={refetchTags}
						tagId={presenter.getSelectedTag()?.id}
						handleModalClose={controller.handleModalClose}
					/>
				}
			/>
		</Modal>
	)
}

const INITIAL_TAG_FORM: TagDTO = {
	id: '',
	name: '',
	color: '',
}

const useEditTag = () => {
	const tagsQuery = useTagsQuery()
	const { mutate } = useMutation(editTag)

	const [tagToEdit, setTagToEdit] = useState<TagDTO>(INITIAL_TAG_FORM)
	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<keyof TagWithoutId, string>>
	>({})
	const [isModalOpen, setIsModalOpen] = useState(false)

	presenter.injectSelectedTag(tagToEdit)
	presenter.injectTags(tagsQuery.data ?? [])
	presenter.injectModalChange(setIsModalOpen)
	presenter.injectInputChange(setTagToEdit)

	controller.injectValidationErrors(setValidationErrors)

	useCase.injectRefetchTags(tagsQuery.refetch)
	useCase.injectClearForm(() => setTagToEdit(INITIAL_TAG_FORM))
	useCase.injectEditTagMutation(mutate)

	return { isModalOpen, validationErrors, refetchTags: tagsQuery.refetch }
}
