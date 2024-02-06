import { CalendarEventFormDTO } from '@/model/calendarEvent.model'
import { toggleTag } from '../FilterByTags'

export const handleEventChange =
	<T extends keyof CalendarEventFormDTO>(field: T, value: string) =>
	(prevEvent: CalendarEventFormDTO) => {
		if (Array.isArray(prevEvent[field])) {
			return {
				...prevEvent,
				[field]: toggleTag(value)(prevEvent[field] as string[]),
			}
		}
		return {
			...prevEvent,
			[field]: value,
		}
	}
