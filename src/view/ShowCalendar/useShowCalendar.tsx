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
	transformDateObjectToCalendarTile,
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

	const emptyCalendarDays = getAdjustCalendarDaysForWeeks(activeMonth)

	const calendarDays = getCalendarDaysForGivenMonth(activeMonth).map(
		transformDateObjectToCalendarTile(selectedDate),
	)

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
		refetchCalendar: calendarQuery.refetch,
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

export type RefetchCalendarFunction = Pick<
	ReturnType<typeof useShowCalendar>,
	'refetchCalendar'
>
