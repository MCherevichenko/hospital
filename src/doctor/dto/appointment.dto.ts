import {ApiProperty} from '@nestjs/swagger';
export class AppointmentDto {
    @ApiProperty({
        description: 'Дата записи',
        example: "2022-05-18T00:00:00.000Z"
    })
    slot?: Date;
}
