import { ValidationError } from '@/utils/errors'
import { AuthDTO } from './auth.model'
import { client } from './utils'
import useQuery from '@/hooks/useQuery'

export const getUser = async (userId: UserDTO['id']) => {
	return client(`users/${userId}`)
}

export const editUser = async ({ id: userId, ...user }: UserDTO) => {
	return client<UserDTO>(`users/${userId}`, { body: user, method: 'PUT' })
}

export const deleteUser = async (userId: UserDTO['id']) => {
	return client(`users/${userId}`, { method: 'DELETE' })
}

export type UserDTO = {
	username: string
	id: string
}

export type UserRegisterDTO = UserDTO & {
	authorized: AuthDTO
}

export type UserWithoutId = Omit<UserDTO, 'id'>

export class UserValidationLogic {
	#validateUsername = (username: string) => {
		if (username.length < 3)
			throw new ValidationError(
				'Username must be at least 3 characters long',
				'username',
			)
		if (username.length > 20)
			throw new ValidationError(
				'Username must be at most 20 characters long',
				'username',
			)
		return
	}

	validateUser = <UserType extends UserWithoutId>(user: UserType) => {
		this.#validateUsername(user.username)
	}
}

export const useUserQuery = (userId: string) => {
	return useQuery({ queryFn: () => getUser(userId), queryKey: ['user'] })
}
