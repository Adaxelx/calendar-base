import { dateLib } from '@/utils/date'
import {
	getAdjustCalendarDaysForWeeks,
	getAllDaysOfWeek,
	getCalendarDaysForGivenMonth,
	getNextMonth,
	getPreviousMonth,
} from './ShowCalendar'
import { DATE_FORMAT } from '@/constants'

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
			expect(result.format(DATE_FORMAT)).toBe(expected)
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
			expect(result.format(DATE_FORMAT)).toBe(expected)
		})
	})
})

describe('getAllDaysOfWeek', () => {
	it('should return an array of all days of the week', () => {
		const result = getAllDaysOfWeek()
		expect(result).toEqual(['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'ndz'])
	})
})

describe('getAdjustCalendarDaysForWeeks', () => {
	const TEST_CASES = [
		{
			date: '2024-02-01',
			expected: 3,
		},
		{
			date: '2024-03-20',
			expected: 4,
		},
		{
			date: '2024-04-30',
			expected: 0,
		},
		{
			date: '2024-09-15',
			expected: 6,
		},
		{
			date: '2024-06-30',
			expected: 5,
		},
	]
	TEST_CASES.forEach(({ date, expected }) => {
		it(`should return an array of adjusted calendar days to weeks for a given date (${date})`, () => {
			const result = getAdjustCalendarDaysForWeeks(dateLib(date))
			expect(result.length).toBe(expected)
		})
	})
})
