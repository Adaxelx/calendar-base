import { client } from './utils'

export type AuthDataDTO = {
	username: string
	password: string
}

export type AuthDTO = {
	accessToken: string
	tokenType: string
	expiresIn: number
}

export const loginUser = async (userCredentials: AuthDataDTO) => {
	return client('auth/login', { body: userCredentials })
}
