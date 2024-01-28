import { HttpResponse, http } from 'msw'
import { authorized } from './data'
import { getApiUrl } from '../../constants'

const BASE = '/auth'

const login = http.post(getApiUrl(`${BASE}/login`), async () => {
	return HttpResponse.json(authorized)
})

export default [login]
