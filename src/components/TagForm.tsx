import { TagWithoutId } from '@/model/tag.model'
import Button from './Button'
import { Field } from './Field'
import { ChangeEventHandler } from 'react'

type TagFormProps = {
	handleChange: (
		fieldName: keyof TagWithoutId,
	) => ChangeEventHandler<HTMLInputElement> | undefined
	tag: TagWithoutId
	validationErrors: Partial<Record<keyof TagWithoutId, string>>
	handleSubmit: React.FormEventHandler<HTMLFormElement>
	isFormDisabled?: boolean
}

export default function TagForm({
	handleChange,
	tag,
	validationErrors,
	handleSubmit,
	isFormDisabled,
}: TagFormProps) {
	return (
		<form className="flex flex-col" onSubmit={handleSubmit}>
			<Field
				labelProps={{ children: 'Name' }}
				error={validationErrors.name}
				inputProps={{
					type: 'text',
					disabled: isFormDisabled,
					value: tag.name,
					onChange: handleChange('name'),
				}}
			/>
			<Field
				error={validationErrors.color}
				labelProps={{
					children: 'Date',
				}}
				inputProps={{
					type: 'color',
					disabled: isFormDisabled,
					value: tag.color,
					onChange: handleChange('color'),
				}}
			/>
			<section className="flex justify-between items-center mt-5 ">
				<Button
					type="submit"
					className="self-end"
					variant="secondary"
					disabled={isFormDisabled}
				>
					Submit tag
				</Button>
			</section>
		</form>
	)
}
