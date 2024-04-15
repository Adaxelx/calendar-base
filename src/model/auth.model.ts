import { UserRegisterDTO } from './user.model'
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

const BASE = 'auth'

export const loginUser = async (userCredentials: AuthDataDTO) => {
	return client<UserRegisterDTO>(`${BASE}/login`, { body: userCredentials })
}

export const createUser = async (user: AuthDataDTO) => {
	return client<UserRegisterDTO>(`${BASE}/register`, { body: user })
}
