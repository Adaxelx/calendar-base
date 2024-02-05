import Calendar from '@/components/Calendar'
import { VISUAL_DATE_FORMAT } from '@/constants'
import useQuery from '@/hooks/useQuery'
import { getCalendarEvents } from '@/model/calendarEvent.model'
import {
	findEventsForGivenDate,
	formatHoursStartAndEnd,
	getAdjustCalendarDaysForWeeks,
	getAllDaysOfWeek,
	getCalendarDaysForGivenMonth,
	getNextMonth,
	getPreviousMonth,
	getStartAndEndOfMonth,
} from '@/use-cases/ShowCalendar'
import { capitalizeFirstLetter } from '@/utils'
import { DateType, dateLib } from '@/utils/date'
import { useState } from 'react'

export default function ShowCalendarView() {
	const {
		weekDays,
		calendarDays,
		activeMonth,
		selectedDate,
		emptyCalendarDays,
		foundEvents,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	} = useShowCalendar()

	return (
		<article className="w-full flex gap-3 h-full">
			<section className="flex flex-col flex-[3]">
				<Calendar
					activeMonth={activeMonth}
					handleNextMonth={handleNextMonth}
					handlePrevMonth={handlePrevMonth}
				>
					{weekDays.map(day => (
						<Calendar.DayOfWeekTile key={day}>{day}</Calendar.DayOfWeekTile>
					))}
					{emptyCalendarDays.map((_, index) => (
						<Calendar.Tile key={index} />
					))}
					{calendarDays.map(({ day, isSelected, date }, index) => (
						<Calendar.Tile
							key={index}
							isSelected={isSelected}
							onClick={() => handleClickDateTile(date)}
						>
							{day}
						</Calendar.Tile>
					))}
				</Calendar>
			</section>
			<section className="flex flex-col flex-[1] rounded bg-accent-200 items-center py-3 gap-3">
				<h2 className="text-accent-600 text-2xl font-semibold">
					Dzisiejsze zadania
				</h2>
				<p>{selectedDate.format(VISUAL_DATE_FORMAT)}</p>
				<div className="flex flex-col gap-3 w-full">
					{foundEvents.map(event => (
						<article
							key={event.id}
							className="flex flex-col bg-accent-400 w-full px-4 py-2"
						>
							<section className="flex justify-between w-full items-center">
								<span className="text-lg">{event.title}</span>
								<span className="text-sm">{event.formatedTime}</span>
							</section>
							<section>
								{event.tags?.map(tag => (
									<span
										key={tag?.id}
										className="text-xs bg-accent-600 text-white rounded-full px-3 py-1"
									>
										{tag?.name}
									</span>
								))}
							</section>
						</article>
					))}
				</div>
			</section>
		</article>
	)
}

const initialDate = dateLib()

const useShowCalendar = () => {
	const [selectedDate, setSelectedDate] = useState(initialDate)
	const [activeMonth, setActiveMonth] = useState(initialDate)

	const calendarQuery = useQuery(() =>
		getCalendarEvents(getStartAndEndOfMonth(activeMonth)),
	)

	// const tagsQuery = useQuery(getTags)

	// const tagsMap = useMemo(
	// 	() =>
	// 		tagsQuery.data?.reduce<Record<string, TagDTO>>((acc, tag) => {
	// 			acc[tag.id] = tag
	// 			return acc
	// 		}, {}),
	// 	[tagsQuery.data],
	// )

	const foundEvents = findEventsForGivenDate(
		calendarQuery.data ?? [],
		selectedDate,
	).map(({ id, title, start, end, tags }) => ({
		id,
		title,
		formatedTime: formatHoursStartAndEnd(start, end),
		tags,
	}))

	const dateTransformer = (date: DateType) => {
		return {
			day: date.date(),
			date: date,
			isSelected: date.isSame(selectedDate, 'day'),
		}
	}

	const emptyCalendarDays = getAdjustCalendarDaysForWeeks(activeMonth)

	const calendarDays =
		getCalendarDaysForGivenMonth(activeMonth).map(dateTransformer)

	const handleClickDateTile = (date: DateType) => {
		setSelectedDate(date)
	}

	const handleNextMonth = () => {
		setActiveMonth(getNextMonth)
	}

	const handlePrevMonth = () => {
		setActiveMonth(getPreviousMonth)
	}

	const weekDays = getAllDaysOfWeek().map(capitalizeFirstLetter)

	const showLoader = calendarQuery.isLoading

	return {
		calendarDays,
		weekDays,
		emptyCalendarDays,
		activeMonth,
		showLoader,
		selectedDate,
		foundEvents,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	}
}
