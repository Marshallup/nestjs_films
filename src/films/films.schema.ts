import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Genre } from 'src/genres/genres.schema';
import { People } from 'src/peoples/peoples.schema';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop()
  releaseDate: Date;

  @Prop()
  releaseDateRF: Date;

  @Prop()
  excerpt: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  kinopoiskID: number;

  @Prop()
  length: number;

  @Prop({ default: false })
  isSerial: boolean;

  @Prop()
  ratingAgeLimits: string;
  
  @Prop({ default: null })
  mainImage: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' } ], default: [] })
  genres: Genre[];

  @Prop({ type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'People' } ], default: [] })
  peoples: People[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);