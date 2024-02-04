import Calendar from '@/components/Calendar'
import {
	getAdjustCalendarDaysForWeeks,
	getAllDaysOfWeek,
	getCalendarDaysForGivenMonth,
	getNextMonth,
	getPreviousMonth,
} from '@/use-cases/ShowCalendar'
import { capitalizeFirstLetter } from '@/utils'
import { DateType, dateLib } from '@/utils/date'
import { useState } from 'react'

export default function ShowCalendarView() {
	const {
		weekDays,
		calendarDays,
		activeMonth,
		emptyCalendarDays,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	} = useShowCalendar()

	return (
		<div className="w-full">
			<h1>Calendar</h1>
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
		</div>
	)
}

const initialDate = dateLib()

const useShowCalendar = () => {
	const [selectedDate, setSelectedDate] = useState(initialDate)
	const [activeMonth, setActiveMonth] = useState(initialDate)

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

	return {
		calendarDays,
		weekDays,
		emptyCalendarDays,
		activeMonth,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	}
}
