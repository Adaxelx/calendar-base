import { HttpResponse, http } from 'msw'
import { registerData } from './data'
import { getEndpointUrl } from '@/model/utils'

const BASE = 'auth'

const login = http.post(getEndpointUrl(`${BASE}/login`), async () => {
	return HttpResponse.json(registerData)
})

const postUser = http.post(getEndpointUrl(BASE), async () => {
	return HttpResponse.json(registerData)
})

export default [login, postUser]
