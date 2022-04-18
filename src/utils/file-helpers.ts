import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { parse } from 'path';
import { diskStorage } from 'multer';
import { IMAGES_DIR } from './constants';
import { createDir } from './helpers';

const uid2 = require('uid2');

export const fileFilterImg: MulterOptions['fileFilter'] = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
        return cb(new Error('Ошибка при загрузке картинки'), false);
    }
    createDir(`.${IMAGES_DIR}`);
    return cb(null, true);
}
export const fileStorageImg = diskStorage({
    destination: `.${IMAGES_DIR}`,
    filename: (req, file, cb) => {
        const parsePath = parse(file.originalname);
        const fileName = parsePath.name.replace(/\s/g, '') + uid2(6);
        const extension = parsePath.ext;

        return cb(null, `${fileName}${extension}`);
    }
})