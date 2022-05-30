import {ApiProperty} from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'Телефон пользователя',
        example: "89999999999"
    })
    phone: string;
    
    @ApiProperty({
        description: 'Имя пользователя',
        example: "Максим"
    })
    username: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: "password"
    })
    password: string;
}
