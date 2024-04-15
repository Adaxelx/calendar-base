import { FormattedCalendarEvent } from '@/use-cases/ShowCalendar'
import Tag from './Tag'
import { HTMLAttributes, ReactNode } from 'react'

import { cn } from './utils'

type CalendarEventProps = {
	title: ReactNode
	formatedTime: ReactNode
	tags: ReactNode
} & DivAttributes

type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, 'title'>

export const CalendarEvent = ({
	title,
	tags,
	formatedTime,
	...rest
}: CalendarEventProps) => {
	return (
		<article
			{...rest}
			className={cn(
				`flex flex-col bg-accent-400 w-full px-4 py-2 gap-2`,
				rest.className,
			)}
		>
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
	...rest
}: DivAttributes & FormattedCalendarEvent) => {
	return (
		<CalendarEvent
			{...rest}
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
