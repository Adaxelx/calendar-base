import Calendar from '@/components/Calendar'
import {
	getCalendarDaysForGivenMonth,
	getNextMonth,
	getPreviousMonth,
} from '@/use-cases/ShowCalendar'
import { DateType, dateLib } from '@/utils/date'
import { useState } from 'react'

export default function ShowCalendarView() {
	const {
		calendarDays,
		activeMonth,
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

	const calendarDays = getCalendarDaysForGivenMonth(activeMonth).map(date => ({
		day: date.date(),
		date: date,
		isSelected: date.isSame(selectedDate, 'day'),
	}))

	const handleClickDateTile = (date: DateType) => {
		setSelectedDate(date)
	}

	const handleNextMonth = () => {
		setActiveMonth(getNextMonth)
	}

	const handlePrevMonth = () => {
		setActiveMonth(getPreviousMonth)
	}

	return {
		calendarDays,
		activeMonth,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	}
}
