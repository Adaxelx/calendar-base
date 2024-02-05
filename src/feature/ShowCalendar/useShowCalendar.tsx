import useQuery from '@/hooks/useQuery'
import { getCalendarEvents } from '@/model/calendarEvent.model'
import type { FilterByTags } from '@/use-cases/FilterByTags'
import {
	findEventsForGivenDate,
	formatCalendarEvent,
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

const initialDate = dateLib()

export const useShowCalendar = (filterByTags: FilterByTags) => {
	const [selectedDate, setSelectedDate] = useState(initialDate)
	const [activeMonth, setActiveMonth] = useState(initialDate)

	const calendarQuery = useQuery(() =>
		getCalendarEvents(getStartAndEndOfMonth(activeMonth)),
	)

	const foundEvents = filterByTags(
		findEventsForGivenDate(calendarQuery.data ?? [], selectedDate).map(
			formatCalendarEvent,
		),
	)

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

	const showCalendarEventLoader = calendarQuery.isLoading

	return {
		calendarDays,
		weekDays,
		emptyCalendarDays,
		activeMonth,
		showCalendarEventLoader,
		selectedDate,
		foundEvents,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	}
}
