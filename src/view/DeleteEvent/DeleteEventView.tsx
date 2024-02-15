import Button from '@/components/Button'
import { useDeleteEvent } from './useDeleteEvent'

export default function DeleteEventView({
	handleDelete,
}: ReturnType<typeof useDeleteEvent>) {
	return (
		<Button colorVariant="error" onClick={handleDelete}>
			Delete
		</Button>
	)
}
