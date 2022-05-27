import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorEntity {
    @ApiProperty({
        description: 'ID доктора',
        required: true,
    })
    @PrimaryGeneratedColumn({type: 'int'})
    id_doctor: number;

    @ApiProperty({
        description: 'Имя доктора',
        required: true
    })
    @Column({
        type: 'varchar'
    })
    name: string;

    @ApiProperty({
        description: 'Специальность доктора',
        required: true
    })
    @Column({
        type: 'varchar',
    })
    spec: string;

    @ApiProperty({
        description: 'Записи на прием',
        required: false
    })
    @Column("simple-array")
    slots?: number[];

    @ApiProperty({
        description: 'Пароль',
        required: true
    })
    @Column({
        type: 'varchar',
    })
    password: string
}
