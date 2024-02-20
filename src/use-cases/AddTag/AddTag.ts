import { TagWithoutId } from '@/model/tag.model'

type AddTagProps = {
	tag: TagWithoutId
	handleCloseModal: () => void
	tagMutation: (tag: TagWithoutId) => unknown
	validate: (tag: TagWithoutId) => boolean
	refetchTags: () => void
	clearForm: () => void
}
// to jest wątpliwe
export const handleAddTag = async ({
	tag,
	handleCloseModal,
	tagMutation,
	refetchTags,
	validate,
	clearForm,
}: AddTagProps) => {
	if (!validate(tag)) return
	const response = await tagMutation(tag)
	if (!response) return
	refetchTags()
	handleCloseModal()
	clearForm()
}
