import { IsNotEmpty } from "class-validator";

export class AddMainImageDto {
    @IsNotEmpty({ message: 'Выберите файл' })
    readonly image: Express.Multer.File;
    @IsNotEmpty({ message: 'Укажите айди фильма' })
    readonly id: string;
}