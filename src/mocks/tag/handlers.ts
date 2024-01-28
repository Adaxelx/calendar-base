import { HttpResponse, http } from 'msw'
import { tags, tag } from './data'
import { getApiUrl } from '../../constants'

const BASE = '/tags'

const WITH_ID = `${BASE}/:tagId`

const getTags = http.get(getApiUrl(BASE), async () => {
	return HttpResponse.json(tags)
})

const getTag = http.get(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const postTag = http.post(getApiUrl(BASE), async () => {
	return HttpResponse.json(tag)
})

const editTag = http.put(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const deleteTag = http.delete(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getTags, getTag, postTag, editTag, deleteTag]
