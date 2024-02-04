import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import worker from './mocks'
import RouterProvider from './feature/Router/Router.tsx'
import 'dayjs/locale/pl'
import dayjs from 'dayjs'

dayjs.locale('pl')
await worker.start()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider />
	</React.StrictMode>,
)
