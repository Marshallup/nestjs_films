import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PeoplesService } from '../peoples.service';
import { GenresService } from 'src/genres/genres.service';
import { ProfessionsService } from 'src/professions/professions.service';

@Injectable()
export class PeoplesSeed {
    constructor(
        private peoplesService: PeoplesService,
        private genresService: GenresService,
        private professionService: ProfessionsService,
    ) {}

    @Command({ command: 'create:peoples', describe: 'create a professions' })
    async create() {
        const fantasy = await this.genresService.getGenreByName('fantasy');
        const detective = await this.genresService.getGenreByName('detective');
        const thriller = await this.genresService.getGenreByName('thriller');
        const actor = await this.professionService.getProfessionByName('actor');
        const producer = await this.professionService.getProfessionByName('producer');

        await this.peoplesService.createPeoples([
            {
                name: 'Брюс Уиллис',
                dateOfBirth: new Date('1955-03-19'),
                genres: [ fantasy._id, detective._id, thriller._id  ],
                professions: [ actor._id, producer._id ],
                films: [],
            },
        ]);
    }
}