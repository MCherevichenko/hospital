import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user', orderBy: { id_user: 'ASC' } })
export class UserEntity {
    @ApiProperty({
        description: 'ID пользователя',
        required: true,
    })
    @PrimaryGeneratedColumn({type: 'int'})
    id_user: number;

    @ApiProperty({
        description: 'Телефон пользователя',
        required: true
    })
    @Column({
        type: 'varchar'
    })
    phone: string;

    @ApiProperty({
        description: 'Имя пользователя',
        required: true
    })
    @Column({
        type: 'varchar',
    })
    name: string;

    @ApiProperty({
        description: 'Пароль',
        required: true
    })
    @Column({
        type: 'varchar',
        select: false,
    })
    password: string;

    @ApiProperty({
        description: 'Дата записи',
    })
    @Column({
        type: 'varchar',
        nullable: true
    })
    date?: string;

    @ApiProperty({
        description: 'Дата записи',
    })
    @Column({
        type: 'int4',
        nullable: true
    })
    id_doctor?: number;
}