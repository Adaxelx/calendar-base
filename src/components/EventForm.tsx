import Button from '@/components/Button'
import { Field } from '@/components/Field'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import TagFilter from '@/components/TagFilter'
import { passInputEventAsValue } from '@/utils'
import { useAddEvent } from '../feature/AddEvent/useAddEvent'
import { CalendarEventFormDTO } from '@/model/calendarEvent.model'
import { INPUT_CLASS_NAME } from '../feature/AddEvent/AddEventView'
import { ReactNode } from 'react'

type EventFormModalProps = {
	isOpen: boolean
	handleOpenChange: (isOpen: boolean) => void
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	validationErrors: ReturnType<typeof useAddEvent>['validationErrors']
	handleFieldChange: ReturnType<typeof useAddEvent>['handleFieldChange']
	event: CalendarEventFormDTO | undefined
	tagsToSelect: ReturnType<typeof useAddEvent>['tagsToSelect']
	children: ReactNode
	formLabel: ReactNode
}

export function EventFormModal({
	isOpen,
	handleOpenChange,
	children,
	...rest
}: EventFormModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			handleOpenChange={handleOpenChange}
			trigger={children}
		>
			<EventForm {...rest} />
		</Modal>
	)
}

type EventFormProps = Omit<
	EventFormModalProps,
	'isOpen' | 'handleOpenChange' | 'children'
>

const EventForm = ({
	handleSubmit,
	validationErrors,
	handleFieldChange,
	event,
	tagsToSelect,
	formLabel,
}: EventFormProps) => {
	if (!event) return
	return (
		<>
			<h1>{formLabel}</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<Field
					labelProps={{ children: 'Name' }}
					error={validationErrors.name}
					inputProps={{
						type: 'text',
						value: event.name,
						onChange: passInputEventAsValue(handleFieldChange('name')),
						className: INPUT_CLASS_NAME,
					}}
				/>
				<Field
					error={validationErrors.date}
					labelProps={{
						children: 'Date',
					}}
					inputProps={{
						type: 'date',
						value: event.date,
						className: INPUT_CLASS_NAME,
						onChange: passInputEventAsValue(handleFieldChange('date')),
					}}
				/>
				<Field
					error={validationErrors.timeStart}
					labelProps={{ children: 'Time start' }}
					inputProps={{
						type: 'time',
						value: event.timeStart,
						onChange: passInputEventAsValue(handleFieldChange('timeStart')),
						className: INPUT_CLASS_NAME,
					}}
				/>
				<Field
					error={validationErrors.timeEnd}
					labelProps={{ children: 'Time end' }}
					inputProps={{
						type: 'time',
						value: event.timeEnd,
						onChange: passInputEventAsValue(handleFieldChange('timeEnd')),
						className: INPUT_CLASS_NAME,
					}}
				/>
				<Label>Tags:</Label>
				<section
					className={`flex flex-wrap gap-2 justify-between ${INPUT_CLASS_NAME}`}
				>
					{tagsToSelect.map(({ id, color, name, checked }) => (
						<TagFilter
							checked={checked}
							key={id}
							color={color}
							onClick={() => handleFieldChange('tagsIds')(id)}
						>
							{name}
						</TagFilter>
					))}
				</section>
				<Button type="submit" className="mt-5 self-end" variant="secondary">
					Submit event
				</Button>
			</form>
		</>
	)
}
