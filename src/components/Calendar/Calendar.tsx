import { HTMLAttributes } from 'react'
import { cn } from '../utils'
import styles from './calendar.module.css'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons'

export default function Calendar() {
	return (
		<article
			className={`border-accent-400 w-full bg-accent-200 border rounded overflow-hidden  ${styles.calendar}`}
		>
			<section
				className={`grid grid-cols-7 w-full [&>*:nth-child(7n)]:border-r-0`}
			>
				<Calendar.Tile>1</Calendar.Tile>
				<Calendar.Tile>2</Calendar.Tile>
				<Calendar.Tile>3</Calendar.Tile>
				<Calendar.Tile>4</Calendar.Tile>
				<Calendar.Tile>5</Calendar.Tile>
				<Calendar.Tile isSelected>6</Calendar.Tile>
				<Calendar.Tile>7</Calendar.Tile>
				<Calendar.Tile>8</Calendar.Tile>
				<Calendar.Tile>9</Calendar.Tile>
			</section>
			<CalendarNavigation />
		</article>
	)
}

const ICON_SIZE = 24

const NavigationButton = ({ children }: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button className="text-accent-700 bg-accent-300 w-12 h-12 grid place-content-center rounded">
			{children}
		</button>
	)
}

const CalendarNavigation = () => {
	return (
		<section className="flex justify-between items-center p-3 bg-accent-200 border-t border-accent-400">
			<NavigationButton>
				<CaretLeftIcon height={ICON_SIZE} width={ICON_SIZE} />
			</NavigationButton>
			<h2 className="text-accent-700 text-lg">May 2021</h2>
			<NavigationButton>
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
