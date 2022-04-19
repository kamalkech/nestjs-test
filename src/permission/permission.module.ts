import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionsGuard } from './casl-ability.guard';

@Module({
  providers: [CaslAbilityFactory, PermissionsGuard],
  exports: [CaslAbilityFactory, PermissionsGuard],
})
export class PermissionModule {}
