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

type TagWithoutId = Omit<TagDTO, 'id'>

export const postTag = async (tag: TagWithoutId) => {
	return client('tags', { body: tag })
}

export const editTag = async (tagId: TagDTO['id'], tag: TagWithoutId) => {
	return client(`tags/${tagId}`, { body: tag })
}

export const deleteTag = async (tagId: TagDTO['id']) => {
	return client(`tags/${tagId}`, { method: 'DELETE' })
}
