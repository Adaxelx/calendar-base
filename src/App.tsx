import CreateUserView from './feature/CreateAccount/CreateAccountView'

function App() {
	// add routing with context
	return (
		<div className="p-3 flex flex-col gap-2 items-start">
			<CreateUserView />
		</div>
	)
}

export default App
