import { ButtonHTMLAttributes } from 'react'
import { cn } from './utils'

export type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & Shared

type Shared = {
	color: string
	'data-testid'?: string
}

export default function Tag({ className, color, children, ...rest }: TagProps) {
	return (
		<span
			{...rest}
			style={{ backgroundColor: color }}
			className={cn(`px-3 py-1 rounded-full block`, className)}
		>
			{children}
		</span>
	)
}
