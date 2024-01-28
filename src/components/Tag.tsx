import { ButtonHTMLAttributes } from 'react'
import colors from 'tailwindcss/colors'
import { cn } from './utils'

export type TagProps = ButtonHTMLAttributes<HTMLButtonElement> & Shared

type Shared = {
	color: keyof typeof colors
	'data-testid'?: string
}

export default function Tag({ className, color, children, ...rest }: TagProps) {
	return (
		<span
			{...rest}
			className={cn(`bg-${color}-300 px-7 py-2 rounded-full block`, className)}
		>
			{children}
		</span>
	)
}
