import { Model, Schema as MongooseSchema } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './entities/user.entity';
import { AppLoggerService } from '@src/app-logger/app-logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly loggerService: AppLoggerService,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     const createdUser = new this.userModel(createUserDto);
  //     await createdUser.save();
  //     return createdUser;
  //   } catch (error) {
  //     this.loggerService.error(`Exception creating user: ${error}`);
  //     throw error;
  //   }
  // }
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: MongooseSchema.Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      this.loggerService.error(
        `Exception find User by id: ${id}, error: ${error}`,
      );
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
