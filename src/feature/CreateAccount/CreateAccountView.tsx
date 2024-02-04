import { Field } from '@/components/Field'
import useCreateUser from './useCreateAccount'
import Button from '@/components/Button'

export default function CreateUserView() {
	const { registerState, handleInputChange, handleSubmit, validationErrors } =
		useCreateUser()

	return (
		<div>
			<form className="flex flex-col gap" onSubmit={handleSubmit}>
				<Field
					labelProps={{ children: 'Username' }}
					inputProps={{
						id: 'username',
						value: registerState.username,
						onChange: e => handleInputChange('username', e.target.value),
					}}
					error={validationErrors['username']}
				/>
				<Field
					labelProps={{ children: 'Password' }}
					inputProps={{
						id: 'password',
						type: 'password',
						value: registerState.password,
						onChange: e => handleInputChange('password', e.target.value),
					}}
					error={validationErrors['password']}
				/>
				<Field
					labelProps={{ children: 'Repeat password' }}
					inputProps={{
						id: 'repeatPassword',
						type: 'password',
						value: registerState.repeatPassword,
						onChange: e => handleInputChange('repeatPassword', e.target.value),
					}}
					error={validationErrors['repeatPassword']}
				/>
				<Button type="submit">Zarejestruj</Button>
			</form>
		</div>
	)
}
