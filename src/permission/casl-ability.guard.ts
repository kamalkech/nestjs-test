import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@src/casl/role.enum';
import mongoose from 'mongoose';
import {
  RequiredPermission,
  PERMISSION_CHECKER_KEY,
} from './casl-ability.decorator';
import {
  CaslAbilityFactory,
  AppAbility,
  PermissionAction,
} from './casl-ability.factory';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];

    // const req = context.switchToHttp().getRequest();
    // const user = req.user;
    const user = {
      _id: new mongoose.Types.ObjectId('62191e8562c13f4accaddda4'),
      username: 'kamal',
      isAdmin: false,
      roles: [Role.User],
      permissions: [
        {
          action: PermissionAction.CREATE,
          name: 'User',
        },
        {
          action: PermissionAction.UPDATE,
          name: 'User',
        },
      ],
    };

    const ability = await this.abilityFactory.createForUser(user);

    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );
  }

  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission,
  ): boolean {
    return ability.can(...permission);
  }
}
