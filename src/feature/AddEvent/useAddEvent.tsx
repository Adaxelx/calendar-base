import { useMutation } from '@/hooks/useMutation'
import useQuery from '@/hooks/useQuery'
import { useValidator } from '@/hooks/useValidator'
import {
	CalendarEventFormDTO,
	postCalendarEvent,
} from '@/model/calendarEvent.model'
import { getTags } from '@/model/tag.model'
import {
	handleEventChange,
	transformDateToApi,
	validateCalendarEvent,
} from '@/use-cases/AddEvent'
import { addCheckedToTags } from '@/use-cases/FilterByTags'
import { useState } from 'react'
import { RefetchCalendarFunction } from './AddEventView'

const INITIAL_EVENT_FORM: CalendarEventFormDTO = {
	name: '',
	date: '',
	timeStart: '',
	timeEnd: '',
	tagsIds: [],
}

export const useAddEvent = ({ refetchCalendar }: RefetchCalendarFunction) => {
	const [event, setEvent] = useState<CalendarEventFormDTO>(INITIAL_EVENT_FORM)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const tagsQuery = useQuery(getTags)

	const { mutate } = useMutation(postCalendarEvent) // add tests
	const { validate, validationErrors } = useValidator(validateCalendarEvent) // add tests

	const handleFieldChange =
		(field: keyof CalendarEventFormDTO) => (value: string) => {
			setEvent(handleEventChange(field, value))
		}

	const tagsWithChecked = addCheckedToTags(tagsQuery.data ?? [], event.tagsIds)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!validate(event)) return
		const postEvent = transformDateToApi(event)
		await mutate(postEvent)
		refetchCalendar()
		setIsModalOpen(false)
	}

	return {
		handleFieldChange,
		event,
		handleSubmit,
		validationErrors,
		isModalOpen,
		handleOpenChange: setIsModalOpen,
		tagsToSelect: tagsWithChecked ?? [],
	}
}
