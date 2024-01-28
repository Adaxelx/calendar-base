import { HttpResponse, http } from 'msw'
import { events, event } from './data'
import { getApiUrl } from '../../constants'

const BASE = '/calendar-events'

const WITH_ID = `${BASE}/:eventId`

const getCalendarEvents = http.get(getApiUrl(BASE), async () => {
	return HttpResponse.json(events)
})

const getCalendarEvent = http.get(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const postCalendarEvent = http.post(getApiUrl(BASE), async () => {
	return HttpResponse.json(event)
})

const editCalendarEvent = http.put(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const deleteCalendarEvent = http.delete(getApiUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [
	getCalendarEvents,
	getCalendarEvent,
	postCalendarEvent,
	editCalendarEvent,
	deleteCalendarEvent,
]
