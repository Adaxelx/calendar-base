import { DATE_FORMAT } from '@/constants'
import { CalendarEventDTO } from '@/model/calendarEvent.model'
import { range } from '@/utils'
import { DateType, dateLib, transformSundayToLast } from '@/utils/date'

export const getCalendarDaysForGivenMonth = (date: DateType) => {
	const firstDay = date.startOf('month').date()
	const lastDay = date.endOf('month').date()

	const days: DateType[] = range(firstDay, lastDay).map((day: number) =>
		date.startOf('month').add(day - 1, 'day'),
	)

	return days
}

export const getAdjustCalendarDaysForWeeks = (date: DateType) => {
	const firstDay = transformSundayToLast(date.startOf('month'))

	return range(0, firstDay - 1)
}

export const getPreviousMonth = (date: DateType) => date.subtract(1, 'month')

export const getNextMonth = (date: DateType) => date.add(1, 'month')

export const getAllDaysOfWeek = () => {
	const [sunday, ...rest] = dateLib.weekdaysShort()
	return [...rest, sunday]
}

export const getStartAndEndOfMonth = (date: DateType) => {
	const start = date.startOf('month').format(DATE_FORMAT)
	const end = date.endOf('month').format(DATE_FORMAT)

	return { start, end }
}

export const findEventsForGivenDate = (
	events: CalendarEventDTO[],
	date: DateType,
) => {
	return events.filter(event => dateLib(event.start).isSame(date, 'day'))
}

export const formatHoursStartAndEnd = (startDate: string, endDate: string) => {
	return `${dateLib(startDate).format('HH:mm')} - ${dateLib(endDate).format(
		'HH:mm',
	)}`
}
