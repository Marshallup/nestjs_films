import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { IMAGES_PEOPLES_DIR } from "src/utils/constants";
import { HttpSuccess } from "src/utils/responseServer";
import { AddImagePeople } from "./dto/add-image-people.dto";
import { CreatePeoplesDto } from "./dto/create-people.dto";
import { UploadImageMainPeople } from "./dto/upload-image-main-people.dto";
import { People, PeopleDocument } from "./peoples.schema";
import { join } from "path";
import { createDir, cutAndPast, removeFile } from "src/utils/helpers";

@Injectable()
export class PeoplesService {
    constructor(@InjectModel(People.name) private PeopleModel: Model<PeopleDocument>) {}

    async getPeopleByName(name: string) {
        try {
            return this.PeopleModel.findOne({ name });
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async createPeoples(dto: CreatePeoplesDto) {
        try {
            const people = await this.PeopleModel.create(dto);

            return people;
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async setMainImage(dto: AddImagePeople) {
        const { id } = dto;

        try {
            const people = await this.PeopleModel.findById(id);

            if (!people) {
                throw new Error('Человека не найдено!');
            }

            try {
                if (people.mainPhoto) {
                    removeFile(join(process.cwd(), `${IMAGES_PEOPLES_DIR}/${id}/${people.mainPhoto}`));
                }
            } catch(error) {}

            people.mainPhoto = dto.imageName;

            await people.save();

            return new HttpSuccess(`Фото успешно добавлено для ${id}`);
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async uploadMainImage(dto: UploadImageMainPeople) {
        const { id, image } = dto;
        const { filename: imageName, path: imageOrigPath } = image;
        const imagePath = join(process.cwd(), imageOrigPath);
    
        try {
            await this.setMainImage({ id, imageName });

            const peoplesDir = join(process.cwd(), `${IMAGES_PEOPLES_DIR}/${id}`);

            createDir(peoplesDir);

            cutAndPast(imagePath, join(peoplesDir, imageName));

            return new HttpSuccess(`Фото "${imageName}" успешно добавлено для человека "${id}"`);

        } catch(error) {
            removeFile(imagePath);

            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}