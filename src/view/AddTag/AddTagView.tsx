import Button from '@/components/Button'
import Modal from '@/components/Modal'

import { passInputEventAsValue } from '@/utils'

import { useAddTag } from './useAddTag'
import TagForm from '@/components/TagForm'

type AddTagViewProps = {
	refetchTags: () => void
}

export default function AddTagView({ refetchTags }: AddTagViewProps) {
	const {
		handleSubmit,
		validationErrors,
		tag,
		handleFieldChange,
		setIsModalOpen,
		isModalOpen,
		handleModalOpen,
	} = useAddTag(refetchTags)
	return (
		<Modal
			isOpen={isModalOpen}
			handleOpenChange={setIsModalOpen}
			trigger={
				<Modal.Trigger asChild>
					<Button className="w-full" onClick={handleModalOpen}>
						Add tag
					</Button>
				</Modal.Trigger>
			}
		>
			<h1>Add tag</h1>
			<TagForm
				handleChange={fieldName =>
					passInputEventAsValue(handleFieldChange(fieldName))
				}
				tag={tag}
				validationErrors={validationErrors}
				handleSubmit={handleSubmit}
				actions={null}
			/>
		</Modal>
	)
}
