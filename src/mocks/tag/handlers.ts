import { HttpResponse, http } from 'msw'
import { tags, tag } from './data'
import { getUrl } from '../../constants'

const BASE = '/tags'

const WITH_ID = `${BASE}/:tagId`

const getTags = http.get(getUrl(BASE), async () => {
	return HttpResponse.json(tags)
})

const getTag = http.get(getUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const postTag = http.post(getUrl(BASE), async () => {
	return HttpResponse.json(tag)
})

const editTag = http.put(getUrl(WITH_ID), async () => {
	return HttpResponse.json(tag)
})

const deleteTag = http.delete(getUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [getTags, getTag, postTag, editTag, deleteTag]
