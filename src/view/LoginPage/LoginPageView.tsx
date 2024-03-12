import { Field } from '@/components/Field'

import Button from '@/components/Button'
import { AuthDataDTO, loginUser } from '@/model/auth.model'
import { useState } from 'react'

import { useMutation } from '@/hooks/useMutation'

import { useUser } from '@/components/UserContext'
import { useRoutingHook } from '../Router'
import { LoginUserPresenter } from './LoginUserPresenter'
import { LoginUserController } from './LoginUserController'
import { LoginUserUseCase } from './LoginUserUseCase'

const presenter = new LoginUserPresenter()
const useCase = new LoginUserUseCase(presenter)
const controller = new LoginUserController(useCase)

export default function LoginUser() {
	const { authData, validationErrors, isLoading } = useLoginUser()
	return (
		<article className="w-full h-full flex flex-col items-center justify-center p-3">
			<section className="flex flex-col gap-2 md:w-1/2 w-full">
				<h1 className="text-2xl font-semibold">Login</h1>
				<form onSubmit={controller.handleSubmitClick(authData)}>
					<Field
						labelProps={{ children: 'Username' }}
						inputProps={{
							id: 'username',
							value: authData.username,
							onChange: controller.handleFieldChange('username'),
						}}
						error={validationErrors['username']}
					/>
					<Field
						labelProps={{ children: 'Password' }}
						inputProps={{
							id: 'password',
							type: 'password',
							value: authData.password,
							onChange: controller.handleFieldChange('password'),
						}}
						error={validationErrors['password']}
					/>
					<Button type="submit" className="w-full">
						Zaloguj
					</Button>
					<Button
						variant="tertiary"
						className="text-accent-700 text-center w-full"
						onClick={controller.handleRegisterRedirect}
						disabled={isLoading}
					>
						Nie masz konta? Zarejestruj się
					</Button>
				</form>
			</section>
		</article>
	)
}

const useLoginUser = () => {
	const [authData, setAuthData] = useState<AuthDataDTO>({
		username: '',
		password: '',
	})
	const [validationErrors, setValidationErrors] = useState<
		Partial<Record<keyof AuthDataDTO, string>>
	>({})
	const { mutate, isLoading } = useMutation(loginUser)
	const { dispatch } = useUser()
	const { handleRedirect } = useRoutingHook()

	presenter.injectAuthDataChange(setAuthData)
	presenter.incjectDispatch(dispatch)
	presenter.injectRedirect(handleRedirect)

	controller.injectSetValidationErrors(setValidationErrors)

	useCase.incjectMutate(mutate)

	return { authData, validationErrors, isLoading }
}
