import Button from '@/components/Button'
import { useUser } from '@/components/UserContext'
import { useMutation } from '@/hooks/useMutation'
import { deleteUser } from '@/model/user.model'
import { DeleteAccountUseCase } from './DeleteAccountUseCase'
import { DeleteAccountController } from './DeleteAccountController'
import { DeleteAccountPresenter } from './DeleteAccountPresenter'

const presenter = new DeleteAccountPresenter()
const useCase = new DeleteAccountUseCase(presenter)
const controller = new DeleteAccountController(useCase)

export default function DeleteAccount() {
	useDeleteAccount()
	return (
		<Button
			colorVariant="error"
			variant="tertiary"
			onClick={controller.handleDeleteUser}
		>
			Delete account
		</Button>
	)
}

const useDeleteAccount = () => {
	const { mutate } = useMutation(deleteUser)
	const {
		state: { user },
		dispatch,
	} = useUser()

	presenter.injectLogout(() => {
		dispatch({ type: 'logout' })
	})
	controller.injectUserId(user?.id)
	useCase.injectDeleteMutation(mutate)
}
