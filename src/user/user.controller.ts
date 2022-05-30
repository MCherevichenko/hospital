import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cron } from '@nestjs/schedule';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiBody({ type: CreateUserDto, description: 'Новый пользователь' })
  public create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного пользователя' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiBody({ type: UpdateUserDto, description: 'Новые данные для пользователя' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Cron('* * 23 * * *')
  @ApiOperation({ summary: 'Оповещение за сутки до приема' })
  handleCronHour() {
    this.userService.notificationDay(86400000);
  }

  @Cron('* * 1 * * *')
  @ApiOperation({ summary: 'Оповещение за два часа до приема' })
  handleCronDay() {
    this.userService.notificationDay(7200000);
  }
}
