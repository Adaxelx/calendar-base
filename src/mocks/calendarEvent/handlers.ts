import { HttpResponse, http } from 'msw'
import { events, event } from './data'
import { getUrl } from '../../constants'

const BASE = '/calendar-events'

const WITH_ID = `${BASE}/:eventId`

const getCalendarEvents = http.get(getUrl(BASE), async () => {
	return HttpResponse.json(events)
})

const getCalendarEvent = http.get(getUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const postCalendarEvent = http.post(getUrl(BASE), async () => {
	return HttpResponse.json(event)
})

const editCalendarEvent = http.put(getUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const deleteCalendarEvent = http.delete(getUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [
	getCalendarEvents,
	getCalendarEvent,
	postCalendarEvent,
	editCalendarEvent,
	deleteCalendarEvent,
]
