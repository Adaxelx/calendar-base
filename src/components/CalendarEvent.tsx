import { FormattedCalendarEvent } from '@/use-cases/ShowCalendar'
import Tag from './Tag'
import { ReactNode } from 'react'

export const CalendarEvent = ({
	title,
	tags,
	formatedTime,
}: {
	title: ReactNode
	formatedTime: ReactNode
	tags: ReactNode
}) => {
	return (
		<article className="flex flex-col bg-accent-400 w-full px-4 py-2 gap-2">
			<section className="flex justify-between w-full items-center gap-2">
				{title}
				{formatedTime}
			</section>
			<section className="flex gap-2 ">{tags}</section>
		</article>
	)
}

export const CalendarEventView = ({
	title,
	tags,
	formatedTime,
}: FormattedCalendarEvent) => {
	return (
		<CalendarEvent
			title={<span className="text-lg">{title}</span>}
			formatedTime={<span className="text-sm">{formatedTime}</span>}
			tags={tags?.map(({ name, color, id }) => (
				<Tag color={color} key={id}>
					{name}
				</Tag>
			))}
		/>
	)
}

// export const CalendarEventForm = ({
// 	title,
// 	tags,
// 	formatedTime,
// 	onChange,
// }: FormattedCalendarEvent & { onChange: () => void; values: any }) => {
// 	const [startTime, endTime] = splitEventFormattedTime(formatedTime)
// 	return (
// 		<CalendarEvent
// 			title={<Input value={title} onChange={onChange} />}
// 			formatedTime={
// 				<>
// 					<Input value={startTime} onChange={onChange} />
// 					<Input value={endTime} onChange={onChange} />
// 				</>
// 			}
// 			tags={tags?.map(({ name, color, id }) => (
// 				<Tag color={color} key={id}>
// 					{name}
// 				</Tag>
// 			))}
// 		/>
// 	)
// }
