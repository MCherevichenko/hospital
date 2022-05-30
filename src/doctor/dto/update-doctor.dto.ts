import { PartialType } from '@nestjs/mapped-types';
import {ApiProperty} from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({
        description: 'ID доктора',
        example: 1
    })
    id_doctor: number;

    @ApiProperty({
        description: 'Имя доктора',
        example: 'Артур'
    })
    username?: string;

    @ApiProperty({
        description: 'Специальность доктора',
        example: 'Терапевт'
    })
    spec?: string;

    @ApiProperty({
        description: 'Записи доктора',
        example: []
    })
    slots?: string[];
}
