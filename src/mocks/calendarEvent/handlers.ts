import { HttpResponse, http } from 'msw'
import { events, event } from './data'
import { getEndpointUrl } from '@/model/utils'

const BASE = 'calendar-events'

const WITH_ID = `${BASE}/:eventId`

const getCalendarEvents = http.get(getEndpointUrl(BASE), async () => {
	return HttpResponse.json(events)
})

const getCalendarEvent = http.get(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const postCalendarEvent = http.post(getEndpointUrl(BASE), async () => {
	return HttpResponse.json(event)
})

const editCalendarEvent = http.put(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json(event)
})

const deleteCalendarEvent = http.delete(getEndpointUrl(WITH_ID), async () => {
	return HttpResponse.json({})
})

export default [
	getCalendarEvents,
	getCalendarEvent,
	postCalendarEvent,
	editCalendarEvent,
	deleteCalendarEvent,
]
