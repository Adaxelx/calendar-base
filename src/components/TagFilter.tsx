import { useId } from 'react'
import Checkbox from './Checkbox'
import Tag, { TagProps } from './Tag'

export default function TagFilter({
	checked,
	...props
}: TagProps & { checked?: boolean }) {
	const id = useId()
	const tagId = `tag-${id}`

	return (
		<div className="flex gap-3 items-center">
			<Checkbox id={tagId} checked={checked} onClick={props?.onClick} />
			<label htmlFor={tagId}>
				<Tag {...props} />
			</label>
		</div>
	)
}
