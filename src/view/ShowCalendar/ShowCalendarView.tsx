import Calendar from '@/components/Calendar'
import { CalendarEventView } from '@/components/CalendarEvent'
import { DATE_FORMAT, VISUAL_DATE_FORMAT } from '@/constants'

import FilterByTagsView from '../FilterByTags/FilterByTagsView'
import { useFilterByTags } from '../FilterByTags/useFilterByTags'
import { useShowCalendar } from './useShowCalendar'
import { AddEventView } from '../AddEvent/AddEventView'
import { EditEventView } from '../EditEvent/EditEventView'
import { useEditEvent } from '../EditEvent/useEditEvent'
import Modal from '@/components/Modal'
import AddTagView from '../AddTag/AddTagView'
import EditTagView from '../EditTagView/EditTagView'

export default function ShowCalendarView() {
	const { handleFilterClick, showTagLoader, tags, filterByTags, refetchTags } =
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
		refetchCalendar,
	} = useShowCalendar(filterByTags)

	const { handleEditModalOpen, ...restEditProps } = useEditEvent({
		refetchCalendar,
	})

	const showLoader = showTagLoader || showCalendarEventLoader

	return (
		<article className="w-full flex-col flex h-full items-center gap-3">
			<div className="flex-1" />
			<section className="flex gap-3 w-full items-center">
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
				<section className="flex flex-col flex-[1] rounded bg-accent-200 items-center py-3 gap-3 self-stretch">
					{showLoader ? (
						<p>Loading...</p>
					) : (
						<>
							<h2 className="text-accent-600 text-2xl font-semibold">
								Tasks for today
							</h2>
							<FilterByTagsView
								tags={tags}
								handleFilterClick={handleFilterClick}
							/>
							<p>{selectedDate.format(VISUAL_DATE_FORMAT)}</p>
							<div className="flex flex-col gap-3 w-full">
								{foundEvents.map(event => (
									<EditEventView
										{...restEditProps}
										refetchCalendar={refetchCalendar}
									>
										<Modal.Trigger asChild>
											<CalendarEventView
												{...event}
												onClick={() =>
													handleEditModalOpen({
														...event,
														date: selectedDate.format(DATE_FORMAT),
													})
												}
												key={event.id}
											/>
										</Modal.Trigger>
									</EditEventView>
								))}
							</div>
						</>
					)}
					<div className="flex-1" />
				</section>
			</section>
			<div className="w-full flex flex-1 items-start gap-3">
				<AddEventView refetchCalendar={refetchCalendar} />
				<AddTagView refetchTags={refetchTags} />
				<EditTagView refetchTags={refetchTags} />
			</div>
		</article>
	)
}
