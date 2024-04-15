import TagFilter from '@/components/TagFilter'
import { useFilterByTags } from './useFilterByTags'

type FilterByTagsViewProps = Pick<
	ReturnType<typeof useFilterByTags>,
	'tags' | 'handleFilterClick'
>

export default function FilterByTagsView({
	handleFilterClick,
	tags,
}: FilterByTagsViewProps) {
	return (
		<div className="flex flex-wrap justify-between gap-3 w-full px-3">
			{tags.map(({ id, color, name, checked }) => (
				<TagFilter
					id={id}
					color={color}
					onClick={() => handleFilterClick(id)}
					checked={checked}
				>
					{name}
				</TagFilter>
			))}
		</div>
	)
}
