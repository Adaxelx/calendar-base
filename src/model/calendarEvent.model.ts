import { client } from './utils'

export const getCalendarEvents = async () => {
	return client('calendar-events')
}

export const getCalendarEvent = async (eventId: number) => {
	return client(`calendar-events/${eventId}`)
}

export type CalendarEventDTO = {
	id: string
	title: string
	description: string
	start: string
	end: string
	tagsIds: number[]
}

type CalendarEventWithoutId = Omit<CalendarEventDTO, 'id'>

export const postCalendarEvent = async (event: CalendarEventWithoutId) => {
	return client('calendar-events', { body: event })
}

export const editCalendarEvent = async (
	eventId: number,
	event: CalendarEventWithoutId,
) => {
	return client(`calendar-events/${eventId}`, { body: event })
}

export const deleteCalendarEvent = async (eventId: number) => {
	return client(`calendar-events/${eventId}`, { method: 'DELETE' })
}
