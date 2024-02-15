import { AuthDTO } from '@/model/auth.model'
import { UserDTO } from '@/model/user.model'
import { ReactNode, createContext, useContext, useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

type UserStorage = Pick<UserDTO, 'username' | 'id'> &
	Pick<AuthDTO, 'accessToken'>

interface UserProviderProps {
	token: string | undefined
	login: (data: UserStorage) => void
	logout: () => void
}

export const UserContext = createContext<UserProviderProps>({
	token: undefined,
	login: () => {},
	logout: () => {},
})

const { Provider } = UserContext

type UserProps = {
	children: ReactNode
}

const setCookieDate = () => {
	const date = new Date()
	date.setDate(date.getDate() + 14)
	return date
}

const UserProvider = ({ children }: UserProps) => {
	const [token, setToken] = useState<string | undefined>(cookies.get('token'))
	const user: UserProviderProps = {
		token,
		login: (userData: UserStorage) => {
			cookies.set('token', userData.accessToken, {
				path: '/',
				expires: setCookieDate(),
			})
			setToken(userData.accessToken)
		},
		logout: () => {
			cookies.remove('token', { path: '/' })
			setToken(undefined)
		},
	}
	return <Provider value={user}>{children}</Provider>
}

export const useUserContext = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}

export default UserProvider
