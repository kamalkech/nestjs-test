import { Field, ID, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

@InputType()
export class CreateCatDto {
  @IsString()
  @ApiProperty()
  @Field(() => String)
  readonly name: string;

  @IsInt()
  @ApiProperty()
  @Field(() => Number)
  readonly age: number;

  @IsString()
  @ApiProperty()
  @Field(() => String)
  readonly breed: string;

  @IsMongoId()
  @ApiProperty()
  @Field(() => ID)
  readonly owner: mongoose.Schema.Types.ObjectId;
}
