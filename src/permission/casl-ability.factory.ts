import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { User } from '@src/user/entities/user.entity';

export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
registerEnumType(PermissionAction, {
  name: 'PermissionAction',
});

export type PermissionObjectType = any;

export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;

interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

interface NodePermission {
  action: PermissionAction;
  name: string;
}

@Injectable()
export class CaslAbilityFactory {
  // constructor(private authoService: AuthService) {}
  async createForUser(user: User): Promise<AppAbility> {
    // const dbPermissions: Permission[] = await this.authoService.findAllPermissionsOfUser(user);
    const dbPermissions: NodePermission[] = user.permissions;

    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: p.action,
      subject: p.name,
    }));

    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
