type UserRequestInit = Omit<RequestInit, 'body'> & { body?: unknown }

export function client(endpoint: string, customConfig: UserRequestInit = {}) {
	const config = stringifyBody(getRequestConfiguration(customConfig))

	return window
		.fetch(getEndpointUrl(endpoint), config)
		.then(handleResponse)
		.catch(handleError)
}

const handleOtherErrors = async (response: Response) => {
	const errorMessage = await response.text()
	throw new Error(errorMessage)
}

const handleResponse = async (response: Response) => {
	await handle401Response(response)
	const data = await handleSuccessResponse(response)
	if (data) {
		return data
	}
	await handleOtherErrors(response)
}

const handleError = (error: Error) => {
	return Promise.reject(error)
}

const handle401Response = (response: Response) => {
	if (response.status === 401) {
		logout()
		window.location.assign(window.location as unknown as string)
		throw new Error('Please re-authenticate.')
	}
	return response
}

const handleSuccessResponse = (response: Response) => {
	if (response.ok) {
		return response.json()
	}
	return response
}

const getEndpointUrl = (endpoint: string) =>
	`${process.env.REACT_APP_API_URL}/${endpoint}`

function getInitialHeaders() {
	const token = getLoginToken()
	const headers: UserRequestInit['headers'] = {
		'content-type': 'application/json',
	}
	if (token) {
		headers.Authorization = `Bearer ${token}`
	}
	return headers
}

function stringifyBody(config: UserRequestInit) {
	if (config.body) {
		config.body = JSON.stringify(config.body)
	}
	return config as RequestInit
}

function getRequestConfiguration(customConfig: UserRequestInit = {}) {
	const headers = getInitialHeaders()
	const requestMethod = customConfig.body ? 'POST' : 'GET'
	const config: UserRequestInit = {
		method: requestMethod,
		...customConfig,
		headers: {
			...headers,
			...customConfig.headers,
		},
	}

	return config
}

const localStorageKey = '__calendar_token__'

function logout() {
	return window.localStorage.removeItem(localStorageKey)
}

function getLoginToken() {
	return window.localStorage.getItem(localStorageKey)
}
