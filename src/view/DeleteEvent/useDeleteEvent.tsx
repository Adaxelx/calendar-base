import { useMutation } from '@/hooks/useMutation'
import { deleteCalendarEvent } from '@/model/calendarEvent.model'
import { EditEventViewProps } from '../EditEvent/EditEventView'

type DeleteElementProps = {
	eventId: string
}

export const useDeleteEvent = ({
	eventId,
	refetchCalendar,
	handleOpenChange,
}: Pick<EditEventViewProps, 'refetchCalendar' | 'handleOpenChange'> &
	DeleteElementProps) => {
	const { mutate } = useMutation(deleteCalendarEvent)

	const handleDelete = async () => {
		await mutate(eventId)
		refetchCalendar()
		handleOpenChange(false)
	}

	return { handleDelete }
}
