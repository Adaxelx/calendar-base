import { TagDTO } from '@/model/tag.model'
import { DeleteTagUseCase } from './DeleteTagUseCase'

export class DeleteTagController {
	constructor(private readonly useCase: DeleteTagUseCase) {}

	handleDeleteTag = (tagId: TagDTO['id']) => {
		this.useCase.deleteTag(tagId)
	}
}
