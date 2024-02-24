import Button from '@/components/Button'
import { useMutation } from '@/hooks/useMutation'
import { TagDTO, deleteTag } from '@/model/tag.model'
import { DeleteTagPresenter } from './DeleteTagPresenter'
import { DeleteTagUseCase } from './DeleteTagUseCase'
import { DeleteTagController } from './DeleteTagController'

const presenter = new DeleteTagPresenter()
const useCase = new DeleteTagUseCase(presenter)
const controller = new DeleteTagController(useCase)

interface DeleteTagProps {
	tagId: TagDTO['id']
	refetchTags: () => void
	handleModalClose: () => void
}

export default function DeleteTag(props: DeleteTagProps) {
	const { handleDeleteTag } = useDeleteTag(props)
	return (
		<Button
			colorVariant="error"
			onClick={handleDeleteTag}
			disabled={!props.tagId}
		>
			Delete tag
		</Button>
	)
}

const useDeleteTag = ({
	refetchTags,
	tagId,
	handleModalClose,
}: DeleteTagProps) => {
	const { mutate } = useMutateDeleteTag()

	presenter.injectRefetchTags(refetchTags)
	presenter.injectModalClose(handleModalClose)
	useCase.injectDeleteTagMutation(mutate)

	return { handleDeleteTag: () => controller.handleDeleteTag(tagId) }
}

const useMutateDeleteTag = () => {
	return useMutation(deleteTag)
}

export type MutateType = ReturnType<typeof useMutateDeleteTag>['mutate']
