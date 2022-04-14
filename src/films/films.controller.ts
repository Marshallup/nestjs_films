import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
    UsePipes, 
    UseFilters,
    UploadedFile,
    BadRequestException,
    Param
} from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { FilmsService } from './films.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddMainPhotoDto } from './dto/add-main-photo-film.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { FormDataRequest } from 'nestjs-form-data';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { parse } from 'path';
import { FOLDERS } from 'src/utils/constants';
import { ErrorFilter } from 'src/exceptions/filter.exception';
import { fileFilterImg, fileStorageImg } from 'src/utils/file-helpers';
import { UploadImg } from 'src/decorators/upload-img.decorator';

@ApiTags('Пользователи')
@Controller('films')
export class FilmsController {
    constructor(private filmsService: FilmsService) {}

    // @Roles('USER')
    // @UseInterceptors(
    //     FileInterceptor('photo', {
    //         fileFilter: (req, file, cb) => {
    //             if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
    //                 return cb(new Error('Ошибка при загрузке картинки'), false);
    //             }
    //             return cb(null, true);
    //         },
    //         storage: diskStorage({
    //             destination: `.${FOLDERS.IMAGES_DIR}`,
    //             filename: (req, file, cb) => {
    //                 const fileName = parse(file.originalname).name.replace(/\s/g, '') + Date.now();
    //                 const extension = parse(file.originalname).ext;
    //                 cb(null, `${fileName}${extension}`);
    //             }
    //         })
    //     })
    // )
    // @Post(':id')
    // @FormDataRequest({
    //     autoDeleteFile: true,
    // })
    // @UsePipes(new ValidationPipe())
    // ban(@Body() dto: AddMainPhotoDto) {
    //     return {
    //         dto,
    //     }
    //     // return this.usersService.ban(dto);
    // }




    @Post('/:id')
    @UsePipes(new ValidationPipe())
    @UseFilters(new ErrorFilter())
    @UploadImg('image')
    async addPhoto(@UploadedFile() image, @Param('id') id: string): Promise<any> {
        return this.filmsService.addMainPhoto({ id, image  })
    }
}