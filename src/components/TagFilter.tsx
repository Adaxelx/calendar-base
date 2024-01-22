import { useId } from 'react'
import Checkbox from './Checkbox'
import Tag, { TagProps } from './Tag'

export default function TagFilter(props: TagProps) {
	const id = useId()
	const tagId = `tag-${id}`

	return (
		<div className="flex gap-3 items-center">
			<Checkbox id={tagId} />
			<label htmlFor={tagId}>
				<Tag {...props} />
			</label>
		</div>
	)
}
