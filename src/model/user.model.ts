import { AuthDTO } from './auth.model'
import { client } from './utils'

export const getUser = async (userId: UserDTO['id']) => {
	return client(`users/${userId}`)
}

export const editUser = async (userId: UserDTO['id'], user: UserWithoutId) => {
	return client(`users/${userId}`, { body: user })
}

export const deleteUser = async (userId: UserDTO['id']) => {
	return client(`users/${userId}`, { method: 'DELETE' })
}

export type UserDTO = {
	username: string
	id: string
}

type UserWithoutId = Omit<UserDTO, 'id'>

export type UserRegisterDTO = UserDTO & {
	authorized: AuthDTO
}
