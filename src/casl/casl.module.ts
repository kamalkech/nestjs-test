import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
