import { setupWorker } from 'msw/browser'
import userHandlers from './user/handlers'
import eventHandlers from './calendarEvent/handlers'
import authHandlers from './auth/handlers'
import tagHandlers from './tag/handlers'

const worker = setupWorker(
	...userHandlers,
	...eventHandlers,
	...tagHandlers,
	...authHandlers,
)

export default worker
