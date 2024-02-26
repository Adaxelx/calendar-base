import * as React from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserRegisterDTO } from '@/model/user.model'

type Action =
	| { type: 'login'; payload: { token: string; user: UserRegisterDTO | null } }
	| { type: 'logout' }
type Dispatch = (action: Action) => void
type State = { token: string | null; user: UserRegisterDTO | null }
type UserProviderProps = { children: React.ReactNode }

const UserStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined)

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function userReducer(state: State, action: Action) {
	switch (action.type) {
		case 'login': {
			window.localStorage.setItem(TOKEN_KEY, action.payload.token)
			window.localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
			return { ...state, ...action.payload }
		}
		case 'logout': {
			window.localStorage.removeItem(TOKEN_KEY)
			window.localStorage.removeItem(USER_KEY)
			return { ...state, token: null, user: null }
		}
	}
}

const initialState = (initialState: State) => {
	const user = window.localStorage.getItem(USER_KEY)

	if (!user) {
		window.localStorage.removeItem(TOKEN_KEY)
		return initialState
	}
	const token = window.localStorage.getItem(TOKEN_KEY)

	if (isTokenValid(token)) {
		window.localStorage.clear()
		return initialState
	}
	return {
		...initialState,
		token,
		user: JSON.parse(user),
	}
}

const isTokenValid = (token: string | null) => {
	console.log(token)
	return (jwtDecode<{ exp: number }>(token ?? '')?.exp ?? 0) > Date.now() / 1000
}

function UserProvider({ children }: UserProviderProps) {
	const [state, dispatch] = React.useReducer(
		userReducer,
		{ token: null, user: null },
		initialState,
	)

	const value = { state, dispatch }
	return (
		<UserStateContext.Provider value={value}>
			{children}
		</UserStateContext.Provider>
	)
}

function useUser() {
	const context = React.useContext(UserStateContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}

export { UserProvider, useUser }
