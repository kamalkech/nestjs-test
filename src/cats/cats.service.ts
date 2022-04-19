import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { AppLoggerService } from '@src/app-logger/app-logger.service';
import { UserService } from '@src/user/user.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatDocument } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,
    private readonly userService: UserService,
    private readonly loggerService: AppLoggerService,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    try {
      const user = await this.userService.findById(createCatDto.owner);
      if (!user) {
        throw new Error('Owner not exist');
      }

      const createdCat = new this.catModel(createCatDto);
      await createdCat.save();
      return createdCat;
    } catch (error) {
      this.loggerService.error(`Exception creating cat: ${error}`);
      throw error;
    }
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async findById(id: MongooseSchema.Types.ObjectId): Promise<Cat> {
    try {
      const cat = await this.catModel.findById(id).exec();
      console.log('cat', cat);
      if (!cat) {
        throw new Error('Cat not found');
      }
      return cat;
    } catch (error) {
      this.loggerService.error(
        `Exception find cat by id: ${id}, error: ${error}`,
      );
      throw error;
    }
  }
}
