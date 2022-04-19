import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '@src/casl/role.enum';
import { PermissionAction } from '@src/permission/casl-ability.factory';

export type UserDocument = User & Document;

@ObjectType()
export class PermissionUser {
  @Field(() => PermissionAction)
  @Prop()
  action: PermissionAction;

  @Field(() => String)
  @Prop()
  name: string;
}

@Schema()
@ObjectType()
export class User {
  // @Prop({ auto: true })
  // @ApiProperty({ example: '', description: 'The ID of the User' })
  // @Field(() => ID)
  // _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'User A', description: 'The username of the User' })
  @Field(() => String)
  username: string;

  @Field(() => Boolean)
  @Prop({ required: true, unique: true })
  isAdmin: boolean;

  @Field(() => [Role])
  @Prop({ enum: Role, type: String, default: [Role.User] })
  roles: Role[];

  @Field(() => [PermissionUser], { nullable: true })
  @Prop({ type: PermissionUser, required: false })
  permissions?: PermissionUser[];
}

export const UserSchema = SchemaFactory.createForClass(User);
