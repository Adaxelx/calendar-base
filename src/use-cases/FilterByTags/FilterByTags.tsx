import { TagDTO } from '@/model/tag.model'
import { FormattedCalendarEvent } from '../ShowCalendar'

export const toggleTag = (tag: string) => (tags: string[]) => {
	if (tags.includes(tag)) {
		return tags.filter(t => t !== tag)
	}
	return [...tags, tag]
}

export const extractTagIds = (tags: TagDTO[]) => tags.map(tag => tag.id)

export const filterByTags =
	(tags: string[]) => (events: FormattedCalendarEvent[]) =>
		events.filter(event =>
			event.tags.length ? event.tags?.some(tag => tags.includes(tag.id)) : true,
		)

export type FilterByTags = ReturnType<typeof filterByTags>

export const addCheckedToTags = (tags: TagDTO[], checked: string[]) => {
	return tags.map(tag => ({ ...tag, checked: checked.includes(tag.id) }))
}
