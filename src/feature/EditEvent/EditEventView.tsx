import { EventFormModal } from '../../components/EventForm'

import { useEditEvent } from './useEditEvent'

export const INPUT_CLASS_NAME = 'text-primary-900'

type EditEventViewProps = Omit<
	ReturnType<typeof useEditEvent>,
	'handleEditModalOpen'
> & {
	children: React.ReactNode
}

export const EditEventView = ({ children, ...rest }: EditEventViewProps) => {
	return (
		<EventFormModal {...rest} formLabel={`Edit event ${rest?.event?.name}`}>
			{children}
		</EventFormModal>
	)
}
