import * as React from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserDTO } from '@/model/user.model'

type Action =
	| { type: 'login'; payload: { token: string; user: UserDTO | null } }
	| { type: 'logout' }
	| {
			type: 'updateUserData'
			payload: { user: UserDTO }
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }

type Dispatch = (action: Action) => void
type State = { token: string | null; user: UserDTO | null }
type UserProviderProps = { children: React.ReactNode }

const UserStateContext = React.createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined)

export const TOKEN_KEY = 'cal_token'
export const USER_KEY = 'cal_user'

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
		case 'updateUserData': {
			window.localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
			return { ...state, user: action.payload.user }
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

	if (!isTokenValid(token)) {
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
