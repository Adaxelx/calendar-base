import { CalendarEventDTO } from '@/model/calendarEvent.model'
import { getRandomInt, range } from '@/utils'

export const event = {
	id: 0,
	title: 'string',
	description: 'string',
	start: '2024-01-27T22:28:58.043Z',
	end: '2024-01-27T22:28:58.043Z',
	createdAt: '2024-01-27T22:28:58.043Z',
	updatedAt: '2024-01-27T22:28:58.043Z',
	tags: [
		{
			id: 0,
			name: 'string',
			createdAt: '2024-01-27T22:28:58.043Z',
			updatedAt: '2024-01-27T22:28:58.043Z',
		},
	],
}
export const events: CalendarEventDTO[] = range(0, 40).map(i => ({
	id: i.toString(),
	title: 'string',
	description: 'string',
	start: `2024-02-${getRandomInt(1, 29)}T22:28:58.043Z`,
	end: '2024-02-27T22:28:58.043Z',
	createdAt: '2024-02-27T22:28:58.043Z',
	updatedAt: '2024-02-27T22:28:58.043Z',
	tags: [
		{
			id: '0',
			name: 'string',
			color: '#4acd4a',
			createdAt: '2024-01-27T22:28:58.043Z',
			updatedAt: '2024-01-27T22:28:58.043Z',
		},
	],
}))
