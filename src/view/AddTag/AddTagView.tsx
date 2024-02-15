import Button from '@/components/Button'
import { Field } from '@/components/Field'
import Modal from '@/components/Modal'

import { passInputEventAsValue } from '@/utils'

import { useAddTag } from './useAddTag'

type AddTagViewProps = {
	refetchTags: () => void
}

export default function AddTagView({ refetchTags }: AddTagViewProps) {
	const {
		handleSubmit,
		validationErrors,
		tag,
		handleFieldChange,
		setIsModalOpen,
		isModalOpen,
		handleModalOpen,
	} = useAddTag(refetchTags)
	return (
		<Modal
			isOpen={isModalOpen}
			handleOpenChange={setIsModalOpen}
			trigger={
				<Modal.Trigger asChild>
					<Button className="w-full" onClick={handleModalOpen}>
						Add tag
					</Button>
				</Modal.Trigger>
			}
		>
			<h1>Add tag</h1>
			<form className="flex flex-col" onSubmit={handleSubmit}>
				<Field
					labelProps={{ children: 'Name' }}
					error={validationErrors.name}
					inputProps={{
						type: 'text',
						value: tag.name,
						onChange: passInputEventAsValue(handleFieldChange('name')),
					}}
				/>
				<Field
					error={validationErrors.color}
					labelProps={{
						children: 'Date',
					}}
					inputProps={{
						type: 'color',
						value: tag.color,
						onChange: passInputEventAsValue(handleFieldChange('color')),
					}}
				/>
				<section className="flex justify-between items-center mt-5 ">
					<Button type="submit" className="self-end" variant="secondary">
						Submit tag
					</Button>
				</section>
			</form>
		</Modal>
	)
}
