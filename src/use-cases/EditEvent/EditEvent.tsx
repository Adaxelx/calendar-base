import { CalendarEventFormDTO } from '@/model/calendarEvent.model'
import { FormattedCalendarEvent } from '../ShowCalendar'
import { extractTagIds } from '../FilterByTags'

export const splitEventFormattedTime = (formattedTime: string) => {
	return formattedTime.replace(/\s/g, '').split('-')
}

export type CalendarEventFormEditDTO = CalendarEventFormDTO & { id: string }

export type CalendarEventPreprocesed = FormattedCalendarEvent & {
	date: string
}

export const transformFormattedEventToEventForm = (
	event: CalendarEventPreprocesed,
): CalendarEventFormEditDTO => {
	const { formatedTime, tags, title, ...restOfEvent } = event
	const [timeStart, timeEnd] = splitEventFormattedTime(formatedTime)
	return {
		...restOfEvent,
		name: title,
		tagsIds: extractTagIds(tags),
		timeStart,
		timeEnd,
	}
}

export const extractIdFromEvent = (
	event: CalendarEventFormEditDTO | undefined,
) => {
	if (!event) return []
	const { id, ...restOfEvent } = event
	return [id, restOfEvent as CalendarEventFormDTO] as const
}
