import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user', orderBy: { id_user: 'ASC' } })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({
        description: 'ID пользователя',
        required: true
    })
    id_user: number;

    @ApiProperty({
        description: 'Телефон пользователя',
        required: true
    })
    @Column()
    phone?: string;

    @ApiProperty({
        description: 'Имя пользователя',
        required: true
    })
    @Column({})
    name?: string;
}
