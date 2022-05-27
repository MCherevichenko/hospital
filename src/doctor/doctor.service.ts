import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { AppointmentDto } from './dto/appointment.dto';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(DoctorEntity) private doctorsRepository: Repository<DoctorEntity>,
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>
  ) { }

  public async create(createDoctorDto: CreateDoctorDto) {
    try {
      const doctor = await this.doctorsRepository.save(createDoctorDto);
      return { message: 'Доктор создан', doctor }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при создании доктора. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findAll() {
    try {
      return await this.doctorsRepository.createQueryBuilder('d')
        .select([
          'd.id_doctor as id_doctor',
          'd.name as name',
          'd.spec as spec',
          'd.slots as slots',
          'd.password as password']).getRawMany();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при получении списка докторов. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findOne(id: number) {
    try {
      return await this.doctorsRepository.findOne({ where: { id_doctor: id } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при поиске доктора. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    try {
      const update_user = await this.doctorsRepository.createQueryBuilder().update(DoctorEntity).set({ name: updateDoctorDto.name, spec: updateDoctorDto.spec, slots: updateDoctorDto.slots })
        .where('id_doctor = :id_doctor', { id }).execute();
      return { message: 'Пользователь обновлен', update_user };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при обновлении пользователя. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async remove(id: number) {
    try {
      await this.doctorsRepository.delete({ id_doctor: id });
      return { message: 'Доктор удален' }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при удалении пользователя. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createAppointment(id: number, appointment: AppointmentDto) {
    try {
      if (appointment.slot !== undefined) {
        const doctor = await this.doctorsRepository.findOne({ where: { id_doctor: id } });
        const new_slots: string[] = [];
        const is_real = false;
        const new_date = new Date(appointment.slot);
        if (doctor.slots.length) {
          doctor.slots.forEach((item) => {
            if (+item === new_date.getTime()) {
              return { message: 'Неверно указаны дата' };
            } else {
              new_slots.push(item);
            }
          })
          new_slots.push(String(new_date.getTime()))
          await this.doctorsRepository.createQueryBuilder().update(DoctorEntity).set({ slots: new_slots }).where('id_doctor = :id', { id }).execute();
          await this.usersRepository.createQueryBuilder().update(UserEntity).set({ id_doctor: id }).where('id_user = :id', { id: appointment.id_user }).execute();
        } else {
          await this.doctorsRepository.createQueryBuilder().update(DoctorEntity).set({ slots: [String(new_date.getTime())] }).where('id_doctor = :id', { id }).execute();
        }
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при записи к доктору. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
