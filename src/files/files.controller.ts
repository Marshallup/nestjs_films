import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseFilters, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { parse } from "path";
import { ErrorFilter } from "src/exceptions/filter.exception";
import { IMAGES_DIR } from "src/utils/constants";

@Controller('files')
export class FilesController {
    @Post('upload')
    @UseFilters(new ErrorFilter())
    @UseInterceptors(
        FileInterceptor('photo', {
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|png|webp|jpeg)$/)) {
                    return cb(new Error('Ошибка при загрузке картинки'), false);
                }
                return cb(null, true);
            },
            storage: diskStorage({
                destination: `.${IMAGES_DIR}`,
                filename: (req, file, cb) => {
                    const fileName = parse(file.originalname).name.replace(/\s/g, '') + Date.now();
                    const extension = parse(file.originalname).ext;
                    cb(null, `${fileName}${extension}`);
                }
            })
        })
    )
    async uploadSingleFile(@UploadedFile() file) {
        return {
            success: true,
            filePath: file.path,
        }
    }
}