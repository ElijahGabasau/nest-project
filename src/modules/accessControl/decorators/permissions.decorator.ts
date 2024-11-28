import { SetMetadata } from '@nestjs/common';

import { PermissionEnum } from '../enums/permission.enum'; // переконайся, що цей імпорт правильний

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
