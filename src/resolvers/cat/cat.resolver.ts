import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { CatsService } from '@src/cats/cats.service';
import { CreateCatDto } from '@src/cats/dto/create-cat.dto';
import { Cat } from '@src/cats/entities/cat.entity';

@Resolver()
export class CatResolver {
  constructor(private readonly catService: CatsService) {}

  @Query(() => [Cat])
  async getCats(): Promise<Cat[]> {
    return await this.catService.findAll();
  }

  @Query(() => Cat)
  async getCatById(
    @Args('id', { type: () => ID })
    id: MongooseSchema.Types.ObjectId,
  ): Promise<Cat> {
    return await this.catService.findById(id);
  }

  @Mutation(() => Cat)
  async createCat(
    @Args('input', { type: () => CreateCatDto })
    input: CreateCatDto,
  ): Promise<Cat> {
    return await this.catService.create(input);
  }
}
