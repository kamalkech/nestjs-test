import { ApiProperty } from '@nestjs/swagger';

// export class Cat {
//   /**
//    * The name of the Cat
//    * @example Kitty
//    */
//   name: string;

//   @ApiProperty({ example: 1, description: 'The age of the Cat' })
//   age: number;

//   @ApiProperty({
//     example: 'Maine Coon',
//     description: 'The breed of the Cat',
//   })
//   breed: string;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '@src/user/entities/user.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type CatDocument = Cat & Document;

@Schema()
@ObjectType()
export class Cat {
  @Prop({ auto: true })
  @ApiProperty({ example: '', description: 'The ID of the Cat' })
  @Field(() => ID)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'Cat A', description: 'The name of the Cat' })
  @Field(() => String)
  name: string;

  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @Field(() => Number)
  age: number;

  @Prop({ required: true })
  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  @Field(() => String)
  breed: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  @Field(() => User)
  owner: User;
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  // owner: User[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
