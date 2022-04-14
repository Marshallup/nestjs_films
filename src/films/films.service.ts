import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { AddMainPhotoDto } from "./dto/add-main-photo-film.dto";
import { CreateFilmsDto } from "./dto/create-film.dto";
import { Film, FilmDocument } from "./films.schema";
import { join } from "path";
import { unlinkSync, readFileSync } from "fs";

@Injectable()
export class FilmsService {
    constructor(@InjectModel(Film.name) private FilmModel: Model<FilmDocument>) {}

    // async getProfessionByName(name: string) {
    //     try {
    //         const profession = await this.ProfessionModel.find({ name });

    //         return profession;
    //     } catch(error) {
    //         throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //     }
    // }

    async createFims(dto: CreateFilmsDto) {
        try {
            const films = this.FilmModel.create(dto);

            return films;
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async addMainPhoto(dto: AddMainPhotoDto) {
        try {
            const film = await this.FilmModel.findById(dto.id);

            if (!film) {
                throw Error
            }
        } catch(error) {
            unlinkSync(join(process.cwd(), '/', dto.image.path));

            throw new HttpException('Фильм не найден', HttpStatus.BAD_REQUEST);
        }
        return dto;
    }
}