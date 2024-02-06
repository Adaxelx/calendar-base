import Button from '@/components/Button'
import { Field } from '@/components/Field'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import TagFilter from '@/components/TagFilter'
import useQuery from '@/hooks/useQuery'
import { CalendarEventFormDTO } from '@/model/calendarEvent.model'
import { getTags } from '@/model/tag.model'
import { handleEventChange } from '@/use-cases/AddEvent'
import { addCheckedToTags } from '@/use-cases/FilterByTags'
import { passInputEventAsValue } from '@/utils'
import { useState } from 'react'

const INPUT_CLASS_NAME = 'text-primary-900'

export const AddEventView = () => {
	const { handleFieldChange, handleSubmit, event, tagsToSelect } = useAddEvent()
	return (
		<div className="px-3 w-full">
			<Modal
				trigger={
					<Modal.Trigger asChild>
						<Button className="w-full">Add event</Button>
					</Modal.Trigger>
				}
			>
				<h1>Add event</h1>
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<Field
						labelProps={{ children: 'Name' }}
						inputProps={{
							type: 'text',
							value: event.name,
							onChange: passInputEventAsValue(handleFieldChange('name')),
							className: INPUT_CLASS_NAME,
						}}
					/>
					<Field
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
						labelProps={{ children: 'Time start' }}
						inputProps={{
							type: 'time',
							value: event.timeStart,
							onChange: passInputEventAsValue(handleFieldChange('timeStart')),
							className: INPUT_CLASS_NAME,
						}}
					/>
					<Field
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
			</Modal>
		</div>
	)
}

const INITIAL_EVENT_FORM: CalendarEventFormDTO = {
	name: '',
	date: '',
	timeStart: '',
	timeEnd: '',
	tagsIds: [],
}

const useAddEvent = () => {
	const [event, setEvent] = useState<CalendarEventFormDTO>(INITIAL_EVENT_FORM)
	const tagsQuery = useQuery(getTags)

	const handleFieldChange =
		(field: keyof CalendarEventFormDTO) => (value: string) => {
			console.log(field, value)
			setEvent(handleEventChange(field, value))
		}

	const tagsWithChecked = addCheckedToTags(tagsQuery.data ?? [], event.tagsIds)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
	}

	return {
		handleFieldChange,
		event,
		handleSubmit,
		tagsToSelect: tagsWithChecked ?? [],
	}
}
