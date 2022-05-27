import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({
        description: 'ID пользователя',
        example: 1
    })
    id_user: number;

    @ApiProperty({
        description: 'Телефон пользователя',
        example: "89999999999"
    })
    phone?: string;

    @ApiProperty({
        description: 'Имя пользователя',
        example: "Максим"
    })
    name?: string;
}
