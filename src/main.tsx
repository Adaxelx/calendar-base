import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import worker from './mocks'
import RouterProvider from './feature/Router/Router.tsx'

await worker.start()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider />
	</React.StrictMode>,
)
