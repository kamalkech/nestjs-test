import { Module } from '@nestjs/common';
import { AppLoggerService } from '@src/app-logger/app-logger.service';
import { DatabaseModule } from '@src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AbilityModule } from '@src/ability/ability.module';
import { PermissionModule } from '@src/permission/permission.module';

@Module({
  imports: [DatabaseModule, AbilityModule, PermissionModule],
  providers: [UserService, AppLoggerService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
