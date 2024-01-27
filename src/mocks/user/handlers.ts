import { HttpResponse, http } from 'msw'
import { registerData, user } from './data'
import { getUrl } from '../../constants'

const BASE = '/users'

const WITH_ID = `${BASE}/:id`

const getUser = http.get(getUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const postUser = http.post(getUrl(BASE), async () => {
	return HttpResponse.json(registerData)
})

const editUser = http.put(getUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const deleteUser = http.delete(getUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getUser, postUser, editUser, deleteUser]
