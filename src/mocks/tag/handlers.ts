import { HttpResponse, http } from 'msw'
import { tags, tag } from './data'
import { getEndpointUrl } from '@/model/utils'

const BASE = 'tags'

const WITH_ID = `${BASE}/:tagId`

const getTags = http.get(getEndpointUrl(BASE), async () => {
	return HttpResponse.json(tags)
})

const getTag = http.get(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const postTag = http.post(getEndpointUrl(BASE), async () => {
	return HttpResponse.json(tag)
})

const editTag = http.put(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const deleteTag = http.delete(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getTags, getTag, postTag, editTag, deleteTag]
