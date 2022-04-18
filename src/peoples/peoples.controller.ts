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
import { PeoplesService } from './peoples.service';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ErrorFilter } from 'src/exceptions/filter.exception';
import { UploadImg } from 'src/decorators/upload-img.decorator';

@ApiTags('Люди')
@Controller('peoples')
export class PeoplesController {
    constructor(private peoplesService: PeoplesService) {}

    @Post('/:id')
    @UsePipes(new ValidationPipe())
    @UseFilters(new ErrorFilter())
    @UploadImg('image')
    async uploadMainPhoto(@UploadedFile() image, @Param('id') id: string): Promise<any> {
        if (!image) {
            throw new HttpException('Выберите картинку', HttpStatus.BAD_REQUEST);
        }
        return this.peoplesService.uploadMainImage({ id, image });
    }
}