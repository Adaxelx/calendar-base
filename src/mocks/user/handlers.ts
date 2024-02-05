import { HttpResponse, http } from 'msw'
import { user } from './data'
import { getEndpointUrl } from '@/model/utils'

const BASE = 'users'

const WITH_ID = `${BASE}/:id`

const getUser = http.get(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const editUser = http.put(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(user)
})

const deleteUser = http.delete(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getUser, editUser, deleteUser]
