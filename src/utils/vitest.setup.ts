import '@testing-library/jest-dom'
import 'dayjs/locale/pl'
import localeData from 'dayjs/plugin/localeData'
import dayjs from 'dayjs'

dayjs.locale('pl')
dayjs.extend(localeData)
