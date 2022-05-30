import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {UserEntity} from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private authRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.authRepository
        .createQueryBuilder('user')
        .where('user.name =:username', { username })
        .addSelect('user.password')
        .getOne();
      if (user?.password === password) {
        const { password, ...userInfo } = user;
        return userInfo;
      }
      return null;
    } catch (err) {
      console.log('Ошибка при обращении к БД');
    }
  }

  login(user) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
