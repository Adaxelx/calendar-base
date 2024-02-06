import { useAddEvent } from './useAddEvent'
import { EventFormModal } from '../../components/EventForm'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import { RefetchCalendarFunction } from '../ShowCalendar/useShowCalendar'

export const INPUT_CLASS_NAME = 'text-primary-900'

export const AddEventView = ({ refetchCalendar }: RefetchCalendarFunction) => {
	const {
		handleFieldChange,
		handleSubmit,
		event,
		tagsToSelect,
		validationErrors,
		isModalOpen,
		handleOpenChange,
	} = useAddEvent({ refetchCalendar })

	return (
		<div className="px-3 w-full">
			<EventFormModal
				formLabel="Add event"
				isOpen={isModalOpen}
				handleOpenChange={handleOpenChange}
				handleSubmit={handleSubmit}
				validationErrors={validationErrors}
				handleFieldChange={handleFieldChange}
				event={event}
				tagsToSelect={tagsToSelect}
			>
				<Modal.Trigger asChild>
					<Button className="w-full">Add event</Button>
				</Modal.Trigger>
			</EventFormModal>
		</div>
	)
}
