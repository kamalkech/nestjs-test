import { Module } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { UserResolver } from './user/user.resolver';
import { CatResolver } from './cat/cat.resolver';
import { CatsModule } from '@src/cats/cats.module';

@Module({
  imports: [UserModule, CatsModule],
  providers: [UserResolver, CatResolver],
})
export class ResolversModule {}
