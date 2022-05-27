import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { AppointmentDto } from './dto/appointment.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Создание доктора' })
  @ApiBody({ type: CreateDoctorDto, description: 'Новый доктор' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех докторов' })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение одного доктора' })
  findOne(@Param('id') id: number) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление доктора' })
  @ApiBody({ type: UpdateDoctorDto, description: 'Новые данные для доктора' })
  update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление одного доктора' })
  remove(@Param('id') id: number) {
    return this.doctorService.remove(id);
  }

  @Post('/slot/:id')
  @ApiOperation({ summary: 'Создание записи' })
  @ApiBody({ type: AppointmentDto, description: 'Дата на запись' })
  createAppointment(@Param('id') id: number, @Body() createAppointment: AppointmentDto) {
    return this.doctorService.createAppointment(id, createAppointment);
  }
}
