import Calendar from '@/components/Calendar'
import { CalendarEventView } from '@/components/CalendarEvent'
import { VISUAL_DATE_FORMAT } from '@/constants'

import FilterByTagsView from '../FilterByTags/FilterByTagsView'
import { useFilterByTags } from '../FilterByTags/useFilterByTags'
import { useShowCalendar } from './useShowCalendar'
import { AddEventView } from '../AddEvent/AddEventView'

export default function ShowCalendarView() {
	const { handleFilterClick, showTagLoader, tags, filterByTags } =
		useFilterByTags()

	const {
		weekDays,
		calendarDays,
		activeMonth,
		selectedDate,
		emptyCalendarDays,
		foundEvents,
		showCalendarEventLoader,
		handleClickDateTile,
		handleNextMonth,
		handlePrevMonth,
	} = useShowCalendar(filterByTags)

	const showLoader = showTagLoader || showCalendarEventLoader

	return (
		<article className="w-full flex gap-3 h-full">
			<section className="flex flex-col flex-[3]">
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
			</section>
			<section className="flex flex-col flex-[1] rounded bg-accent-200 items-center py-3 gap-3">
				{showLoader ? (
					<p>Trwa ładowanie...</p>
				) : (
					<>
						<h2 className="text-accent-600 text-2xl font-semibold">
							Dzisiejsze zadania
						</h2>
						<FilterByTagsView
							tags={tags}
							handleFilterClick={handleFilterClick}
						/>
						<p>{selectedDate.format(VISUAL_DATE_FORMAT)}</p>
						<div className="flex flex-col gap-3 w-full">
							{foundEvents.map(event => (
								<CalendarEventView {...event} key={event.id} />
							))}
						</div>
					</>
				)}
				<div className="flex-1" />
				<AddEventView />
			</section>
		</article>
	)
}
