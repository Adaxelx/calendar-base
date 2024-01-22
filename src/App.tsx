import Button, { Link } from './components/Button'
import Calendar from './components/Calendar/Calendar'
import Input from './components/Input'
import Label from './components/Label'
import Logo from './components/Logo'
import Modal from './components/Modal'
import Tag from './components/Tag'
import TagFilter from './components/TagFilter'
import Textarea from './components/Textarea'

function App() {
	return (
		<div className="p-3 flex flex-col gap-6 items-start">
			<Button
				variant="primary"
				size="regular"
				colorVariant="default"
				className="w-1/2"
			>
				Primary
			</Button>
			<Link href="/test">Tutaj</Link>
			<Label>test</Label>
			<Input />
			<Textarea />
			<Tag color="yellow">test</Tag>
			<TagFilter color="yellow">test</TagFilter>
			<Logo />
			<Calendar />
			<Modal trigger={<Modal.Trigger>siema</Modal.Trigger>}>
				siema siema o tej porze
			</Modal>
		</div>
	)
}

export default App
