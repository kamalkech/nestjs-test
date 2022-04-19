import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @Field(() => String)
  readonly username: string;

  @IsString()
  @ApiProperty()
  @Field(() => Boolean, { defaultValue: false })
  readonly isAdmin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
