export class DeleteTagPresenter {
	#refetchTags!: () => void
	#handleModalClose!: () => void

	onSuccess = () => {
		this.#handleModalClose()
		this.#refetchTags()
	}

	injectRefetchTags = (refetchTags: () => void) => {
		this.#refetchTags = refetchTags
	}

	injectModalClose = (handleModalClose: () => void) => {
		this.#handleModalClose = handleModalClose
	}

	onError = () => {
		//error handling
	}
}
