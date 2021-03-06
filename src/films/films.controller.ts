import {
    Controller,
    Post,
    UsePipes, 
    UseFilters,
    UploadedFile,
    Param,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ErrorFilter } from 'src/exceptions/filter.exception';
import { UploadImg } from 'src/decorators/upload-img.decorator';

@ApiTags('Пользователи')
@Controller('films')
export class FilmsController {
    constructor(private filmsService: FilmsService) {}

    @Post('/:id')
    @UsePipes(new ValidationPipe())
    @UseFilters(new ErrorFilter())
    @UploadImg('image')
    async UploadMainImage(@UploadedFile() image, @Param('id') id: string): Promise<any> {
        if (!image) {
            throw new HttpException('Выберите картинку', HttpStatus.BAD_REQUEST);
        }
        return this.filmsService.uploadMainImage({ id, image })
    }
}