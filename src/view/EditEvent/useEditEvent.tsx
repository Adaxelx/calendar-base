import { useMutation } from '@/hooks/useMutation'

import { useValidator } from '@/hooks/useValidator'
import { editCalendarEvent } from '@/model/calendarEvent.model'
import { useTagsQuery } from '@/model/tag.model'
import {
	handleEventChange,
	transformDateToApi,
	validateCalendarEvent,
} from '@/use-cases/AddEvent'
import { addCheckedToTags } from '@/use-cases/FilterByTags'
import { useState } from 'react'
import {
	CalendarEventFormEditDTO,
	CalendarEventPreprocesed,
	extractIdFromEvent,
	transformFormattedEventToEventForm,
} from '@/use-cases/EditEvent'
import { RefetchCalendarFunction } from '../ShowCalendar/useShowCalendar'

export const useEditEvent = ({ refetchCalendar }: RefetchCalendarFunction) => {
	const [isOpen, setIsOpen] = useState(false)
	const [event, setEvent] = useState<CalendarEventFormEditDTO | undefined>(
		undefined,
	)

	const tagsQuery = useTagsQuery()

	const { mutate } = useMutation(editCalendarEvent(event?.id)) // add tests
	const { validate, validationErrors } = useValidator(validateCalendarEvent) // add tests

	const handleFieldChange =
		(field: keyof CalendarEventFormEditDTO) => (value: string) => {
			setEvent(prevEvent => {
				if (!prevEvent) return
				return handleEventChange(field, value)(prevEvent)
			})
		}

	const tagsWithChecked = addCheckedToTags(
		tagsQuery.data ?? [],
		event?.tagsIds ?? [],
	)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!event) return
		if (!validate(event)) return
		const postEvent = transformDateToApi(event)
		await mutate(postEvent)
		refetchCalendar()
		handleEditModalOpen(undefined)
	}

	const handleEditModalOpen = (event: CalendarEventPreprocesed | undefined) => {
		setIsOpen(Boolean(event))
		setEvent(event ? transformFormattedEventToEventForm(event) : undefined)
	}

	const [eventId, eventToEdit] = extractIdFromEvent(event)

	return {
		handleFieldChange,
		event: eventToEdit,
		eventId,
		handleSubmit,
		validationErrors,
		isOpen,
		handleOpenChange: setIsOpen,
		handleEditModalOpen,
		tagsToSelect: tagsWithChecked ?? [],
	}
}
