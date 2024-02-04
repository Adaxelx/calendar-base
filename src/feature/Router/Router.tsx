import React, { createContext, useState } from 'react'
import CreateUserView from '../CreateAccount/CreateAccountView'
import HomePage from '../HomePage'

// Create the router context
const RouterContext = createContext<{
	handleRedirect: (path: string) => void
} | null>(null)

// Custom hook for routing
// eslint-disable-next-line react-refresh/only-export-components
export const useRoutingHook = () => {
	const context = React.useContext(RouterContext)
	if (!context) {
		throw new Error('useRouting must be used within a RouterProvider')
	}
	return context
}

const RouterProvider = () => {
	const [currentRoute, setCurrentRoute] = useState(
		routes.find(route => route.path === window.location.pathname),
	)

	const CurrentPage = currentRoute?.component

	const handleRedirect = (path: string) => {
		setCurrentRoute(routes.find(route => route.path === path))
		window.history.replaceState({}, 'Calendar', window.location.origin + path)
	}

	return (
		<RouterContext.Provider value={{ handleRedirect }}>
			{CurrentPage ? <CurrentPage /> : null}
		</RouterContext.Provider>
	)
}

export default RouterProvider

const routes = [
	{
		path: '/',
		component: HomePage,
	},
	{
		path: '/register',
		component: CreateUserView,
	},
] as const
