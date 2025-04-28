import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // for admin
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (id !== req.user.id) {
      throw new UnauthorizedException(
        'You do not have permission to access this information.',
      );
    }

    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new NotFoundException(
        'The requested user information was not found.',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (id !== req.user.id) {
      throw new UnauthorizedException(
        'You do not have the right to edit this information.',
      );
    }

    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(
        'The user information you want to edit was not found.',
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (id !== req.user.id) {
      throw new UnauthorizedException(
        'You do not have the right to delete this information.',
      );
    }

    try {
      await this.usersService.remove(id);
      return { message: 'The user account has been successfully deleted.' };
    } catch (error) {
      throw new NotFoundException('The user data to be deleted was not found.');
    }
  }
}
