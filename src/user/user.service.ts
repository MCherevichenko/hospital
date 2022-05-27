import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) { }

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
        'u.name as name'
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
      const update_user = await getManager().createQueryBuilder().update(UserEntity).set({ phone: updateUserDto.phone, name: updateUserDto.name }).where('id_doctor = :id', {id}).execute();
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
}
