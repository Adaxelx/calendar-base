import Label from './Label'
import Input from './Input'

export function Field({
	labelProps,
	inputProps,
	error,
	className,
}: {
	labelProps: React.LabelHTMLAttributes<HTMLLabelElement>
	inputProps: React.InputHTMLAttributes<HTMLInputElement>
	error?: string
	className?: string
}) {
	const id = inputProps.id
	const errorId = error ? `${id}-error` : undefined
	return (
		<div className={className}>
			<Label htmlFor={id} {...labelProps} />
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...inputProps}
			/>
			<div className="min-h-[32px] px-3 pb-2 pt-1 text-sm text-red-600">
				{errorId ? error : null}
			</div>
		</div>
	)
}
