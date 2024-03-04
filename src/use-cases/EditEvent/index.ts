export type UserEditDTO = Omit<UserDTO, 'id'> & { password: string }

import { UserDTO } from '@/model/user.model'

export * from './EditEvent'
