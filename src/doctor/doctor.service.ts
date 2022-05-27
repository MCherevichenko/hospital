import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { DoctorEntity } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(DoctorEntity) private doctorsRepository: Repository<DoctorEntity>) { }

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
      return await this.doctorsRepository.createQueryBuilder().getRawMany();
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
      const update_user = await getManager().createQueryBuilder().update(DoctorEntity).set({ name: updateDoctorDto.name, spec: updateDoctorDto.spec, slots: updateDoctorDto.slots })
      .where('id_doctor = :id_doctor', {id}).execute();
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
}
