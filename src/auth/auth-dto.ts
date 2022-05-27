import {ApiProperty} from '@nestjs/swagger';
export class AuthDto {
    @ApiProperty({
        description: 'Имя пользователя',
        example: "Максим"
    })
    name: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'password'
    })
    password: string;
}
