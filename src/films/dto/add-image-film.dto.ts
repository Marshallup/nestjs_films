import { IsNotEmpty } from "class-validator";

export class AddlImageDto {
    @IsNotEmpty({ message: 'Укажите название файла' })
    readonly imageName: string;
    @IsNotEmpty({ message: 'Укажите айди фильма' })
    readonly id: string;
}