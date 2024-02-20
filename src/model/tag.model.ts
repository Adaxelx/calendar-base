import { ValidationError } from '@/utils/errors'
import { client } from './utils'

export const getTags = async () => {
	return client<TagDTO[]>('tags')
}

export const getTag = async (tagId: TagDTO['id']) => {
	return client(`tags/${tagId}`)
}

export type TagDTO = {
	id: string
	name: string
	color: string
}

export type TagWithoutId = Omit<TagDTO, 'id'>

export const postTag = async (tag: TagWithoutId) => {
	return client('tags', { body: tag })
}

export const editTag = ({ id: tagId, ...tag }: TagDTO) => {
	return client<TagDTO>(`tags/${tagId}`, { body: tag, method: 'PUT' })
}

export const deleteTag = async (tagId: TagDTO['id']) => {
	return client(`tags/${tagId}`, { method: 'DELETE' })
}

export class TagValidationLogic {
	#validateTagName = (name: string) => {
		if (name.length < 3)
			throw new ValidationError(
				'Name must be at least 3 characters long',
				'name',
			)
		if (name.length > 20)
			throw new ValidationError(
				'Name must be at most 20 characters long',
				'name',
			)
		return
	}

	#validateTagColor = (color: string) => {
		if (!color.match(/^#[0-9a-f]{6}$/i))
			throw new ValidationError('Color must be in hex format', 'color')
		return
	}

	validateTag = (tag: TagWithoutId) => {
		this.#validateTagName(tag.name)
		this.#validateTagColor(tag.color)
	}
}
