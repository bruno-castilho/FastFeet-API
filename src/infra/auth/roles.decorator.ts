import { SetMetadata } from '@nestjs/common'

export type Role = 'ADMIN' | 'DELIVERY_PERSON'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
