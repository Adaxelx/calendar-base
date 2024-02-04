import { HTMLAttributes } from 'react'
import { cn } from '../utils'
import styles from './calendar.module.css'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons'
import { DateType } from '@/utils/date'

type CalendarProps = {
	activeMonth: DateType
	handleNextMonth: () => void
	handlePrevMonth: () => void
	children: React.ReactNode
}

export default function Calendar({
	activeMonth,
	children,
	handleNextMonth,
	handlePrevMonth,
}: CalendarProps) {
	return (
		<article
			className={`border-accent-400 w-full bg-accent-200 border rounded overflow-hidden  ${styles.calendar}`}
		>
			<section
				className={`grid grid-cols-7 w-full [&>*:nth-child(7n)]:border-r-0`}
			>
				{children}
			</section>
			<CalendarNavigation
				activeMonth={activeMonth}
				handleNextMonth={handleNextMonth}
				handlePrevMonth={handlePrevMonth}
			/>
		</article>
	)
}

const ICON_SIZE = 24

const NavigationButton = ({
	children,
	...rest
}: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			{...rest}
			className="text-accent-700 bg-accent-300 w-12 h-12 grid place-content-center rounded"
		>
			{children}
		</button>
	)
}

const CalendarNavigation = ({
	handleNextMonth,
	handlePrevMonth,
	activeMonth,
}: Pick<
	CalendarProps,
	'activeMonth' | 'handleNextMonth' | 'handlePrevMonth'
>) => {
	const date = activeMonth.format('MMMM YYYY')
	return (
		<section className="flex justify-between items-center p-3 bg-accent-200 border-t border-accent-400">
			<NavigationButton onClick={handlePrevMonth}>
				<CaretLeftIcon height={ICON_SIZE} width={ICON_SIZE} />
			</NavigationButton>
			<h2 className="text-accent-700 text-lg">{date}</h2>
			<NavigationButton onClick={handleNextMonth}>
				<CaretRightIcon height={ICON_SIZE} width={ICON_SIZE} />
			</NavigationButton>
		</section>
	)
}

const Tile = ({
	isSelected,
	className = '',
	...rest
}: {
	isSelected?: boolean
} & HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			{...rest}
			className={cn(
				`w-full h-24 grid place-content-center border-b text-accent-700 border-accent-400 border-r ${
					styles.tile
				} ${isSelected ? 'bg-accent-300' : 'bg-accent-200'}`,
				className,
			)}
		/>
	)
}

Calendar.Tile = Tile
