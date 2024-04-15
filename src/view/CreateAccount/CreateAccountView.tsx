import { Field } from '@/components/Field'
import useCreateUser from './useCreateAccount'
import Button from '@/components/Button'

export default function CreateUserView() {
	const { registerState, handleInputChange, handleSubmit, validationErrors } =
		useCreateUser()

	return (
		<article className="w-full h-full flex flex-col items-center justify-center p-3">
			<section className="flex flex-col gap-2 md:w-1/2 w-full">
				<h1 className="text-2xl font-semibold">Registration form</h1>
				<form onSubmit={handleSubmit}>
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
							onChange: e =>
								handleInputChange('repeatPassword', e.target.value),
						}}
						error={validationErrors['repeatPassword']}
					/>
					<Button type="submit" className="w-full">
						Zarejestruj
					</Button>
				</form>
			</section>
		</article>
	)
}
