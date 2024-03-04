import Button from '@/components/Button'
import Modal from '@/components/Modal'

import { useMutation } from '@/hooks/useMutation'

import { UserEditDTO, useUserQuery } from '@/model/user.model'

import { useState } from 'react'

import { editUser } from '@/model/user.model'
import { useUser } from '@/components/UserContext'

import { Field } from '@/components/Field'
import { EditUserPresenter } from './EditUserPresenter'
import { EditUserUseCase, UserEditFields } from './EditUserUseCase'
import { EditUserController } from './EditUserController'

const presenter = new EditUserPresenter()
const useCase = new EditUserUseCase(presenter)
const controller = new EditUserController(useCase)

export default function EditAccount() {
	const { isModalOpen, validationErrors } = useEditUser()
	return (
		<Modal
			isOpen={isModalOpen}
			handleOpenChange={controller.handleModalOpenChange}
			trigger={
				<Modal.Trigger asChild>
					<Button
						onClick={controller.handleModalOpen}
						variant="tertiary"
						className="text-accent-600"
					>
						Edit account
					</Button>
				</Modal.Trigger>
			}
		>
			<h1>Edit account</h1>
			<form
				className="flex flex-col"
				onSubmit={controller.handleSubmit(presenter.getUserToEdit())}
			>
				<Field
					labelProps={{ children: 'Name' }}
					error={validationErrors.username}
					inputProps={{
						type: 'text',

						value: presenter.getUsername(),
						onChange: controller.handleFieldChange('username'),
					}}
				/>
				<Field
					labelProps={{ children: 'New password' }}
					error={validationErrors.password}
					inputProps={{
						type: 'text',

						value: presenter.getPassword(),
						onChange: controller.handleFieldChange('password'),
					}}
				/>
				<Button type="submit" className="self-end" variant="secondary">
					Submit tag
				</Button>
			</form>
		</Modal>
	)
}

const useEditUser = () => {
	const { mutate } = useMutation(editUser)
	const {
		state: { user },
		dispatch,
	} = useUser()

	if (!user) {
		throw new Error('User is not logged in')
	}

	const userQuery = useUserQuery(user.id)

	const [userToEdit, setUserToEdit] = useState({
		id: user.id,
		username: user.username,
		password: '',
	})
	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<keyof UserEditDTO, string>>
	>({})
	const [isModalOpen, setIsModalOpen] = useState(false)

	presenter.injectUserToEdit(userToEdit)
	presenter.injectModalChange(setIsModalOpen)
	presenter.injectInputChange(setUserToEdit)
	presenter.injectChangeUser((user: UserEditFields) => {
		dispatch({ type: 'updateUserData', payload: { user } })
	})

	controller.injectValidationErrors(setValidationErrors)

	useCase.injectRefetchUser(userQuery.refetch)
	useCase.injectEditUserMutation(mutate)

	return { isModalOpen, validationErrors }
}
