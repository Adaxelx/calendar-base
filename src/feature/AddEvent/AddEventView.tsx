import Button from '@/components/Button'
import { Field } from '@/components/Field'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import TagFilter from '@/components/TagFilter'
import { passInputEventAsValue } from '@/utils'
import { useShowCalendar } from '../ShowCalendar/useShowCalendar'
import { useAddEvent } from './useAddEvent'

const INPUT_CLASS_NAME = 'text-primary-900'

export type RefetchCalendarFunction = Pick<
	ReturnType<typeof useShowCalendar>,
	'refetchCalendar'
>

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
			<Modal
				isOpen={isModalOpen}
				handleOpenChange={handleOpenChange}
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
			</Modal>
		</div>
	)
}
