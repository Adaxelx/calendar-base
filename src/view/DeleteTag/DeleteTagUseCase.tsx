import { TagDTO } from '@/model/tag.model'
import { DeleteTagPresenter } from './DeleteTagPresenter'
import { MutateType } from './DeleteTag'

export class DeleteTagUseCase {
	#handleDeleteTag!: MutateType

	constructor(private readonly presenter: DeleteTagPresenter) {
		this.presenter = presenter
	}

	deleteTag = async (tagId: TagDTO['id']) => {
		const tag = await this.#handleDeleteTag(tagId)
		if (tag) {
			return this.presenter.onSuccess()
		}
		return this.presenter.onError()
	}

	injectDeleteTagMutation = (mutate: MutateType) => {
		this.#handleDeleteTag = mutate
	}
}
