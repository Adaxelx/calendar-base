import {
	CalendarEventFormDTO,
	CalendarEventPost,
} from '@/model/calendarEvent.model'
import { toggleTag } from '../FilterByTags'
import { ValidationError } from '@/utils/errors'
import { DateType, dateLib } from '@/utils/date'

export const handleEventChange =
	<Event extends CalendarEventFormDTO>(field: keyof Event, value: string) =>
	(prevEvent: Event) => {
		if (Array.isArray(prevEvent[field])) {
			return {
				...prevEvent,
				[field]: toggleTag(value)(prevEvent[field] as string[]),
			}
		}
		return {
			...prevEvent,
			[field]: value,
		}
	}

export const validateEventName = (name: CalendarEventFormDTO['name']) => {
	const MIN = 1
	const MAX = 30
	if (name.length > MIN && name.length < MAX) return
	throw new ValidationError(
		`Name must have min. ${MIN} and max. ${MAX}`,
		'name',
	)
}

export const checkIfTimeEndIsAfterTimeStart = ({
	timeEnd,
	timeStart,
}: Pick<CalendarEventFormDTO, 'timeEnd' | 'timeStart'>) => {
	const timeStartDayObject = returnHoursDayObject(timeStart)
	const timeEndDayObject = returnHoursDayObject(timeEnd)
	const isEndBeforeStart = timeEndDayObject?.isBefore(timeStartDayObject)

	if (isEndBeforeStart) {
		throw new ValidationError('Time end must be after time start', 'timeEnd')
	}
}

export const validateCalendarEvent = (calendarEvent: CalendarEventFormDTO) => {
	const { timeStart, timeEnd, name, date } = calendarEvent
	validateEventName(name)
	validateDate(date, 'date')
	validateTime(timeStart, 'timeStart')
	validateTime(timeEnd, 'timeEnd')
	checkIfTimeEndIsAfterTimeStart({ timeStart, timeEnd })
}

export const transformDateToApi = (
	calendarEvent: CalendarEventFormDTO,
): CalendarEventPost => {
	const { timeStart, timeEnd, date, name, ...rest } = calendarEvent
	const dates = transformDatesEventFormToEventPost({ timeEnd, timeStart, date })
	return { ...dates, title: name, description: '', ...rest }
}

const transformDatesEventFormToEventPost = ({
	date,
	timeEnd,
	timeStart,
}: Pick<CalendarEventFormDTO, 'timeStart' | 'timeEnd' | 'date'>): Pick<
	CalendarEventPost,
	'start' | 'end'
> => {
	const start = getRequiredDateFormat(returnHoursDayObject(timeStart, date))
	const end = getRequiredDateFormat(returnHoursDayObject(timeEnd, date))

	return { start, end }
}

const returnHoursDayObject = (
	time: string,
	date: string | undefined = undefined,
) => {
	const [hours, minutes] = splitToHoursAndMinutes(time)
	return dateLib(date).hour(hours).minute(minutes)
}

const checkIfValidNumber = (num: number, field: string) => {
	if (typeof num !== 'number' || isNaN(num)) {
		throw new ValidationError('Time is required', field)
	}
}

const splitToHoursAndMinutes = (time: string) => time.split(':').map(Number)

const validateDate = (date: string, validationField: string) => {
	if (!dateLib(date).isValid()) {
		throw new ValidationError('Date is required', validationField)
	}
}

const getRequiredDateFormat = (date: DateType) => date.toISOString()

const validateTime = (time: string, validationField: string) => {
	const [hours, minutes] = time.split(':').map(Number)
	checkIfValidNumber(hours, validationField)
	checkIfValidNumber(minutes, validationField)
}
