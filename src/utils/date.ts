import dateLib, { Dayjs as DateType } from 'dayjs'

export const transformSundayToLast = (date: DateType) =>
	date.day() === 0 ? 6 : date.day() - 1

export { dateLib, DateType }
