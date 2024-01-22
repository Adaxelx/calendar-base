import { HTMLAttributes } from 'react'
import { cn } from '../utils'
import styles from './calendar.module.css'

export default function Calendar() {
	return (
		<article
			className={`grid grid-cols-7 border-accent-400 border rounded [&>*:nth-child(7n)]:border-r-0 overflow-hidden ${styles.calendar}`}
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
		</article>
	)
}

const Tile = ({
	isSelected,
	className = '',
	...rest
}: {
	isSelected?: boolean
} & HTMLAttributes<HTMLDivElement>) => {
	return (
		<section
			{...rest}
			className={cn(
				`w-24 h-24 grid place-content-center border-b text-accent-700 border-accent-400 border-r ${
					styles.tile
				} ${isSelected ? 'bg-accent-300' : 'bg-accent-200'}`,
				className,
			)}
		/>
	)
}

Calendar.Tile = Tile
