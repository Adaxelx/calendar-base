type StorageNames = 'accessToken'

export function getCookie(name: StorageNames) {
	return localStorage.getItem(name)
}

export function setCookie(name: StorageNames, value: string) {
	return localStorage.setItem(name, value)
}
