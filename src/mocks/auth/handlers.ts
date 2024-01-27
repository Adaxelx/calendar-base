import { HttpResponse, http } from 'msw'
import { authorized } from './data'
import { getUrl } from '../../constants'

const BASE = '/auth'

const login = http.post(getUrl(`${BASE}/login`), async () => {
	return HttpResponse.json(authorized)
})

export default [login]
