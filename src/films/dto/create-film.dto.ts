import { Schema } from 'mongoose';

export class CreateFilmDto {
    readonly name: string;
    readonly releaseDate: Date;
    readonly releaseDateRF: Date;
    readonly excerpt: string;
    readonly description: string;
    readonly rating: number;
    readonly kinopoiskID: number;
    readonly length: number;
    readonly genres: Schema.Types.ObjectId[];
    readonly peoples: Schema.Types.ObjectId[];
}
export type CreateFilmsDto = CreateFilmDto[];