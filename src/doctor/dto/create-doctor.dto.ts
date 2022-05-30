import {ApiProperty} from '@nestjs/swagger';
export class CreateDoctorDto {
    @ApiProperty({
        description: 'Имя доктора',
        example: 'Максим'
    })
    username: string;

    @ApiProperty({
        description: 'Специальность доктора',
        example: 'Терапевт'
    })
    spec: string;

    @ApiProperty({
        description: 'Записи доктора',
        example: [],
    })
    slots?: string[];

    @ApiProperty({
        description: 'Пароль доктора',
        example: 'password'
    })
    password: string;
}
