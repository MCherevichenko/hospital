import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        .where('user.username =:username', { username })
        .addSelect('user.password')
        .getOne();
        
      if (user?.password === password) {
        const { password, ...userInfo } = user;
        return userInfo;
      }
      return null;
    } catch (err) {
      throw new HttpException('Нет доступа к бд', 500);
    }
  }

  async login(user) {
      const isValid = await this.validateUser(user.username, user.password)
      if (isValid) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload, {
            secret:process.env.JWT_SECRET
          }),
        };
      }
      throw new UnauthorizedException('No auth')
   
  }
}
