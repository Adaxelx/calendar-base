import { useMutation } from '@/hooks/useMutation'
import { useValidator } from '@/hooks/useValidator'
import { TagWithoutId, postTag } from '@/model/tag.model'
import { handleAddTag, handleTagChange, validateTag } from '@/use-cases/AddTag'
import { useState } from 'react'

const INITIAL_TAG_FORM: TagWithoutId = {
	name: '',
	color: '',
}

export function useAddTag(refetchTags: () => void) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [tag, setTag] = useState<TagWithoutId>(INITIAL_TAG_FORM)
	const { mutate } = useMutation(postTag)
	const { validate, validationErrors } = useValidator(validateTag)

	const handleFieldChange = (field: keyof TagWithoutId) => (value: string) => {
		setTag(handleTagChange(field, value))
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		handleAddTag({
			tag,
			tagMutation: mutate,
			refetchTags,
			validate,
			handleCloseModal: () => setIsModalOpen(false),
			clearForm: () => setTag(INITIAL_TAG_FORM),
		})
	}

	const handleModalOpen = () => setIsModalOpen(true)

	return {
		validationErrors,
		tag,
		handleFieldChange,
		isModalOpen,
		setIsModalOpen,
		handleModalOpen,
		handleSubmit,
	}
}
