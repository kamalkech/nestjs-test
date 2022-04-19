import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from '@src/user/dto';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUserById(
    @Args('id', { type: () => ID })
    id: MongooseSchema.Types.ObjectId,
  ): Promise<User> {
    return await this.userService.findById(id);
  }

  // @Mutation(() => User)
  // async createUser(
  //   @Args('input', { type: () => CreateUserDto })
  //   input: CreateUserDto,
  // ): Promise<User> {
  //   return await this.userService.create(input);
  // }
}
