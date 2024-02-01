import { client } from './utils'

export type AuthDataDTO = {
	username: string
	password: string
}

export const loginUser = async (userCredentials: AuthDataDTO) => {
	return client('auth/login', { body: userCredentials })
}
