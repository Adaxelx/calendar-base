import { HttpResponse, http } from 'msw'
import { registerData, user } from './data'
import { getApiUrl } from '../../constants'

const BASE = '/users'

const WITH_ID = `${BASE}/:id`

const getUser = http.get(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const postUser = http.post(getApiUrl(BASE), async () => {
	return HttpResponse.json(registerData)
})

const editUser = http.put(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const deleteUser = http.delete(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getUser, postUser, editUser, deleteUser]
