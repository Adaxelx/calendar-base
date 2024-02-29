import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

// import worker from './mocks'
import RouterProvider from './view/Router/Router.tsx'
import 'dayjs/locale/pl'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'

dayjs.locale('pl')
dayjs.extend(localeData)
// await worker.start()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider />
	</React.StrictMode>,
)
