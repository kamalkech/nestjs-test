import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@src/casl/role.enum';
import { Roles } from '@src/casl/roles.decorator';
import { Schema as MongooseSchema } from 'mongoose';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

// @ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('casl')
  @Roles(Role.Admin)
  casl() {
    console.log('111', 111);
    return { name: 'pl' };
    // this.catsService.create(createCatDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return await this.catsService.create(createCatDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Cat],
  })
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  findOne(@Param('id') id: MongooseSchema.Types.ObjectId): Promise<Cat> {
    return this.catsService.findById(id);
  }
}
