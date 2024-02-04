import { useRoutingHook } from '@/feature/Router'
import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from 'react'

type LinkProps = Shared &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		disabled?: boolean
	}

type Variant = 'primary' | 'secondary' | 'tertiary'

type Size = 'regular' | 'big'

type Color = 'default' | 'error'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Shared

type Shared = {
	variant?: Variant
	size?: Size
	colorVariant?: Color
	'data-testid'?: string
}

const getSize = (size: Size) => {
	switch (size) {
		case 'big':
			return 'text-4xl py-5 px-8'
		default:
			return 'base py-3 px-5'
	}
}

type StylesObject = Record<Variant, Record<Color, string>>

const buttonStyles: StylesObject = {
	primary: {
		default:
			'bg-accent-400 text-accent-900 hover:bg-accent-200 focus:bg-accent-400 disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800',
		error:
			'bg-red-300 text-red-900 hover:bg-red-400 focus:bg-red-400 disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800',
	},
	secondary: {
		default:
			'border border-accent-800 text-accent-900 bg-accent-300 hover:bg-accent-200 focus:bg-accent-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-800',
		error:
			'border border-red-500 bg-red-100 text-red-900 hover:bg-red-200 focus:bg-red-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-800',
	},
	tertiary: {
		default:
			'bg-transparent text-accent-200 hover:text-accent-200 focus:text-accent-400 disabled:text-gray-400',
		error:
			'bg-transparent text-red-500  hover:text-red-600 focus:text-red-600  disabled:text-gray-400',
	},
}

// const activeLinkStyles: StylesObject = {
//   primary: {
//     default:
//       "bg-accent-400 text-accent-900 hover:bg-accent-200 focus:bg-accent-400 disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800",
//     error:
//       "bg-red-300 text-red-900 hover:bg-red-400 focus:bg-red-400 disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-800",
//   },
//   secondary: {
//     default:
//       "border border-accent-800 text-accent-900 bg-accent-100 hover:bg-accent-200 focus:bg-accent-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-800",
//     error:
//       "border border-red-500 bg-red-100 text-red-900 hover:bg-red-200 focus:bg-red-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-800",
//   },
//   tertiary: {
//     default: "text-accent-400 hover:text-accent-500",
//     error:
//       "bg-transparent text-red-500  hover:text-red-600 focus:text-red-600  disabled:text-gray-400",
//   },
// };

export default function Button({
	variant = 'primary',
	size = 'regular',
	colorVariant = 'default',
	...props
}: ButtonProps) {
	const generatedClassName = getClassFromProps({
		size,
		variant,
		colorVariant,
		className: props.className ?? '',
	})

	return <button type="button" {...props} className={generatedClassName} />
}

const getClassFromProps = <
	T extends Required<Omit<Shared, 'data-testid'>> & { className: string },
>({
	size,
	variant,
	colorVariant,
	className,
}: T) =>
	[
		getSize(size),
		buttonStyles[variant][colorVariant],
		`rounded transition-colors inline-block ${
			className ?? ''
		} disabled:cursor-not-allowed`,
	].join(' ')

export function Link({
	variant = 'primary',
	size = 'regular',
	colorVariant = 'default',
	...props
}: LinkProps) {
	const generatedClassName = getClassFromProps({
		size,
		variant,
		colorVariant,
		className: props.className ?? '',
	})

	const { handleRedirect } = useRoutingHook()
	if (props.disabled) {
		return (
			<button
				type="button"
				disabled={props.disabled}
				className={generatedClassName}
				data-testid={props['data-testid'] ?? ''}
			>
				{props.children as ReactNode}
			</button>
		)
	}

	return (
		<a
			{...props}
			onClick={e => {
				e.preventDefault()
				handleRedirect(props.href ?? '')
				props?.onClick?.(e)
			}}
			className={`text-center ${generatedClassName}`}
		/>
	)
}
