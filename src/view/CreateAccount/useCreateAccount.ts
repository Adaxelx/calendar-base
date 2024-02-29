import { useState } from 'react'

import { useMutation } from '@/hooks/useMutation'
import { useValidator } from '@/hooks/useValidator'
import { createUser } from '@/model/auth.model'
import {
	RegisterFields,
	RegisterStateUpdater,
	UserValidationLogic,
} from '@/use-cases/CreateAccount'
import { useUser } from '@/components/UserContext'

const INITIAL_STATE = {
	password: '',
	repeatPassword: '',
	username: '',
}

const userValidationLogic = new UserValidationLogic()
/** Connect react state logic to business logic */
export default function useCreateUser() {
	const [registerState, setRegisterState] =
		useState<RegisterFields>(INITIAL_STATE)
	const { dispatch, state } = useUser()
	console.log(state)

	const { mutate } = useMutation(createUser)
	const { validate, validationErrors } = useValidator(
		userValidationLogic.validateRegister,
	)

	const handleRegisterStateUpdate: RegisterStateUpdater = (field, value) => {
		setRegisterState(prevState => ({ ...prevState, [field]: value }))
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!validate(registerState)) return
		const userData = await mutate({
			username: registerState.username,
			password: registerState.password,
		})
		if (!userData) return
		dispatch({
			type: 'login',
			payload: {
				token: userData.authorized.accessToken,
				user: { id: userData.id, username: userData.username },
			},
		})

		// add redirect here to calendar
	}

	return {
		registerState,
		validationErrors,
		handleSubmit,
		handleInputChange: handleRegisterStateUpdate,
	}
}
