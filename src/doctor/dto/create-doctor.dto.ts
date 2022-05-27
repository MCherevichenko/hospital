export class CreateDoctorDto {
    name: string;
    spec: string;
    slots?: number[];
    password: string;
}
