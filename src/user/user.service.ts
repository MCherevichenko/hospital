import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';
import { AppController } from 'src/app.controller';



@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(DoctorEntity) private doctorsRepository: Repository<DoctorEntity>
  ) { }
  private readonly logger = new Logger(AppController.name);

  public async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.save(createUserDto);
      return { message: 'Пользователь создан', user };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при создании пользователеля. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findAll() {
    try {
      return await this.usersRepository.createQueryBuilder('u').select([
        'u.id_user as id_user',
        'u.phone as phone',
        'u.username as username',
        'u.password as password'
      ]).getRawMany();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при поиске пользователей. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async findOne(id: number) {
    try {
      return await this.usersRepository.findOne({ where: { id_user: id } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Ошибка при поиске пользователя. Error: ${error}`
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const update_user = await this.usersRepository.createQueryBuilder().update(UserEntity).set({ phone: updateUserDto.phone, username: updateUserDto.username }).where('id_user = :id', { id }).execute();
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
      await this.usersRepository.delete({ id_user: id });
      return { message: 'Пользователь удален' }
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

  public async notificationDay(time: number) {
    const users = await this.usersRepository.createQueryBuilder('u').select([
      'u.id_user as id_user',
      'u.phone as phone',
      'u.username as username',
      'u.id_doctor as id_doctor'
    ]).getRawMany();

    const doctors = await this.doctorsRepository.createQueryBuilder('d').select([
      'd.id_doctor as id_doctor',
      'd.username as username',
      'd.spec as spec',
      'd.slots as slots',
      'd.password as password']).getRawMany();

    for (const user_key in users) {
      for (const doctor_key in doctors) {
        if(users[user_key].id_doctor === doctors[doctor_key].id_doctor){
          doctors[doctor_key].slots.forEach(item => {
            const current_date = new Date();
            if (current_date.getTime() > new Date(users[user_key].date).getTime()-time) {
              this.logger.log(`${current_date}| Hi ${users[user_key].username}! We remind you that you have an appointment with ${ doctors[doctor_key].spec } tomorrow at ${ users[user_key].date }!`);
            }
          })
        }
      }
    }
  }

  public async findByName(name: string){
    return await this.usersRepository.findOne({where: {username: name}});
  }
}
