import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { DoctorModule } from './doctor/doctor.module';
import { UserEntity } from './user/entities/user.entity';
import { DoctorEntity } from './doctor/entities/doctor.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports:[
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity, DoctorEntity],
      synchronize: true,
    }),
    UserModule,
    DoctorModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]
})
export class AppModule {
  constructor() {
    console.log(process.env);
    
  }
}
