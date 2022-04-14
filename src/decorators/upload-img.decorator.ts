import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { fileFilterImg, fileStorageImg } from 'src/utils/file-helpers';

export function UploadImg(fileKey: string) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    UseInterceptors(FileInterceptor(fileKey, {
      fileFilter: fileFilterImg,
      storage: fileStorageImg,
    })),
  );
}