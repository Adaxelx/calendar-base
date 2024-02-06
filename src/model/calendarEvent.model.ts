import { TagDTO } from './tag.model'
import { client, createSearchParams } from './utils'

type CalendarEventsFilters = {
	start: string
	end: string
}

export const getCalendarEvents = async (
	filters: Partial<CalendarEventsFilters> = {},
) => {
	return client<CalendarEventDTO[]>(
		`calendar-events${createSearchParams(filters)}`,
	)
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
	tags: TagDTO[]
}

export type CalendarEventFormDTO = {
	name: string
	date: string
	timeStart: string
	timeEnd: string
	tagsIds: string[]
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
