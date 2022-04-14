import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { parse } from 'path';
import { diskStorage } from 'multer';
import { FOLDERS } from "./constants";

export const fileFilterImg: MulterOptions['fileFilter'] = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
        return cb(new Error('Ошибка при загрузке картинки'), false);
    }
    if (!existsSync(`.${FOLDERS.IMAGES_DIR}`)) {
        mkdirSync(`.${FOLDERS.IMAGES_DIR}`);
    }
    return cb(null, true);
}
export const fileStorageImg = diskStorage({
    destination: `.${FOLDERS.IMAGES_DIR}`,
    filename: (req, file, cb) => {
        const fileName = parse(file.originalname).name.replace(/\s/g, '') + Date.now();
        const extension = parse(file.originalname).ext;
        return cb(null, `${fileName}${extension}`);
    }
})