import { ForbiddenError } from '@casl/ability';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { CheckAbility } from '@src/ability/ability.decorator';
import { AbilityFactory, Action } from '@src/ability/ability.factory';
import { AbilitiesGuard } from '@src/ability/ability.guard';
import { Role } from '@src/casl/role.enum';
import { CheckPermissions } from '@src/permission/casl-ability.decorator';
import { PermissionAction } from '@src/permission/casl-ability.factory';
import { PermissionsGuard } from '@src/permission/casl-ability.guard';
import mongoose from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = {
      _id: new mongoose.Types.ObjectId('62191e8562c13f4accaddda4'),
      username: 'kamal',
      isAdmin: false,
      roles: [Role.User],
    };
    const ability = this.abilityFactory.defineAbility(user);

    // const isAllowed = ability.can(Action.Create, User);
    // if (!isAllowed) {
    //   throw new ForbiddenException('Only admin');
    // }

    try {
      ForbiddenError.from(ability)
        // .setMessage('Your message')
        .throwUnlessCan(Action.Create, User);
      return this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(AbilitiesGuard)
  // @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'User'])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
