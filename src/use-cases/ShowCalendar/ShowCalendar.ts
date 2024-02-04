import { range } from '@/utils'
import { DateType } from '@/utils/date'

export const getCalendarDaysForGivenMonth = (date: DateType) => {
	const firstDay = date.startOf('month').date()
	const lastDay = date.endOf('month').date()

	const days: DateType[] = range(firstDay, lastDay).map((day: number) =>
		date.startOf('month').add(day - 1, 'day'),
	)

	return days
}

export const getPreviousMonth = (date: DateType) => date.subtract(1, 'month')

export const getNextMonth = (date: DateType) => date.add(1, 'month')
