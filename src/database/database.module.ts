import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from '@src/cats/entities/cat.entity';
import { User, UserSchema } from '@src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class DatabaseModule {}
