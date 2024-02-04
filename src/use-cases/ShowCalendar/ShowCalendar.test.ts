import { dateLib } from '@/utils/date'
import {
	getCalendarDaysForGivenMonth,
	getNextMonth,
	getPreviousMonth,
} from './ShowCalendar'

describe('getCalendarDaysForGivenMonth', () => {
	const TEST_CASES = [
		{
			date: '2024-02-01',
			expected: 29,
		},
		{
			date: '2024-03-20',
			expected: 31,
		},
		{
			date: '2024-04-30',
			expected: 30,
		},
	]
	TEST_CASES.forEach(({ date, expected }) => {
		it(`should return an array of calendar days for a given date (${date})`, () => {
			const result = getCalendarDaysForGivenMonth(dateLib(date))
			expect(result).toHaveLength(expected)
			expect(result[0].date()).toBe(1)
			expect(result[result.length - 1].date()).toBe(expected)
		})
	})
})

describe('getPreviousMonth', () => {
	const TEST_CASES = [
		{
			date: '2024-02-01',
			expected: '2024-01-01',
		},
		{
			date: '2024-03-20',
			expected: '2024-02-20',
		},
		{
			date: '2024-04-30',
			expected: '2024-03-30',
		},
	]
	TEST_CASES.forEach(({ date, expected }) => {
		it(`should return the previous month for a given date (${date})`, () => {
			const result = getPreviousMonth(dateLib(date))
			expect(result.format('YYYY-MM-DD')).toBe(expected)
		})
	})
})

describe('getNextMonth', () => {
	const TEST_CASES = [
		{
			date: '2024-02-01',
			expected: '2024-03-01',
		},
		{
			date: '2024-03-20',
			expected: '2024-04-20',
		},
		{
			date: '2024-04-30',
			expected: '2024-05-30',
		},
	]
	TEST_CASES.forEach(({ date, expected }) => {
		it(`should return the next month for a given date (${date})`, () => {
			const result = getNextMonth(dateLib(date))
			expect(result.format('YYYY-MM-DD')).toBe(expected)
		})
	})
})
