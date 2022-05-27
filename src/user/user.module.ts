import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DoctorEntity } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, DoctorEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
