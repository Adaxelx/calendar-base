import useQuery from '@/hooks/useQuery'
import { getTags } from '@/model/tag.model'
import {
	addCheckedToTags,
	extractTagIds,
	filterByTags,
	toggleTag,
} from '@/use-cases/FilterByTags'
import { useEffect, useState } from 'react'

export const useFilterByTags = () => {
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const tagsQuery = useQuery(getTags)

	useEffect(() => {
		if (tagsQuery.data) {
			setSelectedTags(extractTagIds(tagsQuery.data))
		}
	}, [tagsQuery.data])

	const showTagLoader = tagsQuery.isLoading

	const handleFilterClick = (tag: string) => {
		setSelectedTags(toggleTag(tag))
	}

	const filterTags = addCheckedToTags(tagsQuery.data ?? [], selectedTags)

	return {
		showTagLoader,
		filterByTags: filterByTags(selectedTags),
		tags: filterTags,
		handleFilterClick,
		refetchTags: tagsQuery.refetch,
	}
}
