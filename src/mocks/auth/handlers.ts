import { HttpResponse, http } from 'msw'
import { authorized, registerData } from './data'
import { getApiUrl } from '../../constants'

const BASE = '/auth'

const login = http.post(getApiUrl(`${BASE}/login`), async () => {
	return HttpResponse.json(authorized)
})

const postUser = http.post(getApiUrl(BASE), async () => {
	return HttpResponse.json(registerData)
})

export default [login, postUser]
