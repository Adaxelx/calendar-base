import { TagWithoutId } from '@/model/tag.model'
import { ValidationError } from '@/utils/errors'

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

export const handleTagChange =
	(field: keyof TagWithoutId, value: string) =>
	<T extends TagWithoutId>(prevTag: T) => ({
		...prevTag,
		[field]: value,
	})

export const validateTagName = (name: string) => {
	if (name.length < 3)
		throw new ValidationError('Name must be at least 3 characters long', 'name')
	if (name.length > 20)
		throw new ValidationError('Name must be at most 20 characters long', 'name')
	return
}

export const validateTagColor = (color: string) => {
	if (!color.match(/^#[0-9a-f]{6}$/i))
		throw new ValidationError('Color must be in hex format', 'color')
	return
}

export const validateTag = (tag: TagWithoutId) => {
	validateTagName(tag.name)
	validateTagColor(tag.color)
}
