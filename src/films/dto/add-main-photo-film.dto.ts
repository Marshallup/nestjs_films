import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import mongoose from "mongoose";
import { IsFile, HasMimeType, FileSystemStoredFile } from 'nestjs-form-data';
// import { IsFile } from "src/validationDecorators/is-file.decorator";

export class AddMainPhotoDto {
    // @IsFile({ mime: ['image/jpg'] }, { message: 'Недопустимый формат изображения' })
    // @IsNotEmpty({ message: 'Картинка не может быть пустой' })
    // @HasMimeType(['image/jpeg', 'image/png'])
    // @IsFile({ message: '1 onde file' })
    // readonly photo: FileSystemStoredFile;

    // @HasMimeType(['image/jpeg', 'image/png'])
    @IsNotEmpty({ message: 'Выберите файл' })
    readonly image: FileSystemStoredFile;
    @IsNotEmpty({ message: 'Укажите айди фильма' })
    readonly id: string;
}