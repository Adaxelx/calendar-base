import { EventFormModal } from '../../components/EventForm'
import DeleteEventView from '../DeleteEvent/DeleteEventView'
import { useDeleteEvent } from '../DeleteEvent/useDeleteEvent'
import { RefetchCalendarFunction } from '../ShowCalendar/useShowCalendar'

import { useEditEvent } from './useEditEvent'

export const INPUT_CLASS_NAME = 'text-primary-900'

export type EditEventViewProps = Omit<
	ReturnType<typeof useEditEvent>,
	'handleEditModalOpen'
> & {
	children: React.ReactNode
} & RefetchCalendarFunction

export const EditEventView = ({ children, ...rest }: EditEventViewProps) => {
	const { handleOpenChange, refetchCalendar, eventId } = rest
	const { handleDelete } = useDeleteEvent({
		eventId,
		handleOpenChange,
		refetchCalendar,
	})
	return (
		<EventFormModal
			{...rest}
			formLabel={`Edit event`}
			customActions={<DeleteEventView handleDelete={handleDelete} />}
		>
			{children}
		</EventFormModal>
	)
}
