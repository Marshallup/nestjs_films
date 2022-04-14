import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './films.schema';
import { FilmsService } from './films.service';
import { NestjsFormDataModule, MemoryStoredFile, FileSystemStoredFile } from 'nestjs-form-data';
import { FOLDERS } from 'src/utils/constants';

@Module({
    imports: [
      NestjsFormDataModule.config({
        storage: FileSystemStoredFile,
        fileSystemStoragePath: `.${FOLDERS.IMAGES_DIR}`,
      }),
      MongooseModule.forFeature(
          [
            {
              name: Film.name,
              schema: FilmSchema,
            },
          ],
      ),
    ],
    controllers: [
      FilmsController,
    ],
    providers: [
      FilmsService
    ],
    exports: [
      FilmsService,
    ]
})
export class FilmsModule {}