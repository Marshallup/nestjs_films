import { Schema } from 'mongoose';

export class CreatePeopleDto {
    readonly name: string;
    readonly dateOfBirth: Date;
    readonly genres: string[];
    readonly professions: Schema.Types.ObjectId[];
    readonly films: Schema.Types.ObjectId[];
}

export type CreatePeoplesDto = CreatePeopleDto[];