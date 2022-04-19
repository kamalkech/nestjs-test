import { Module } from '@nestjs/common';
import { AppLoggerService } from '@src/app-logger/app-logger.service';
import { DatabaseModule } from '@src/database/database.module';
import { UserModule } from '@src/user/user.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [CatsController],
  providers: [CatsService, AppLoggerService],
  exports: [CatsService],
})
export class CatsModule {}
