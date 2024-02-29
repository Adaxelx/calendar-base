import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

// import worker from './mocks'
import RouterProvider from './view/Router/Router.tsx'
import 'dayjs/locale/pl'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

dayjs.locale('pl')
dayjs.extend(localeData)
// await worker.start()

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
)
