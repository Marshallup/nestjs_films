import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { AddMainImageDto } from "./dto/add-main-image-film.dto";
import { CreateFilmsDto } from "./dto/create-film.dto";
import { Film, FilmDocument } from "./films.schema";
import { createDir, cutAndPast, removeFile } from "src/utils/helpers";
import { IMAGES_FILMS_DIR } from "src/utils/constants";
import { join } from "path";
import { AddlImageDto } from "./dto/add-image-film.dto";
import { HttpSuccess } from "src/utils/responseServer";

@Injectable()
export class FilmsService {
    constructor(@InjectModel(Film.name) private FilmModel: Model<FilmDocument>) {}

    async createFims(dto: CreateFilmsDto) {
        try {
            const films = this.FilmModel.create(dto);

            return films;
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async addAdditionalImage(dto: AddlImageDto) {

        try {
            const film = await this.FilmModel.findByIdAndUpdate(dto.id, { $push: { images: dto.imageName } });

            if (!film) {
                throw new Error('Фильма не найдено!');
            }
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
        
    }

    async setMainImage(dto: AddlImageDto) {
        try {
            const { id } = dto;
            const film = await this.FilmModel.findById(id);

            if (!film) {
                throw new Error('Фильма не найдено!');
            }

            if (film.mainImage) {
                await this.addAdditionalImage({ id, imageName: film.mainImage });
            }

            film.mainImage = dto.imageName;

            await film.save();

        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async uploadMainImage(dto: AddMainImageDto) {
        const { id } = dto;
        const { filename: imageName, path: imageOrigPath } = dto.image;
        const imagePath = join(process.cwd(), imageOrigPath);

        try {
            await this.setMainImage({ id: dto.id, imageName});

            const filmDir = join(process.cwd(), `${IMAGES_FILMS_DIR}/${id}`);

            createDir(filmDir);

            cutAndPast(imagePath, join(filmDir, imageName));

            return new HttpSuccess(`Фото "${imageName}" успешно добавлено для фильма "${id}"`);

        } catch(error) {
            removeFile(imagePath);

            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}