import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RolesSeed } from 'src/roles/seeds/roles.seed';
import { GenresSeed } from 'src/genres/seeds/genres.seed';
import { UsersSeed } from 'src/users/seeds/users.seed';
import { ProfessionsSeed } from 'src/professions/seeds/professions.seed';
import { PeoplesSeed } from 'src/peoples/seeds/peoples.seed';
import { FilmsSeed } from 'src/films/seeds/films.seed';


@Injectable()
export class GeneralSeed {
    constructor(
        private rolesSeed: RolesSeed,
        private genresSeed: GenresSeed,
        private usersSeed: UsersSeed,
        private professionsSeed: ProfessionsSeed,
        private peoplesSeed: PeoplesSeed,
        private filmsSeed: FilmsSeed,
    ) {}

    @Command({ command: 'create:all', describe: 'create all' })
    async create() {
        try {
            await this.genresSeed.create();
        } catch(error) {

        }
        try {
            await this.rolesSeed.create();
        } catch(error) {
            
        }
        try {
            await this.usersSeed.create();
        } catch(error) {
            
        }
        try {
            await this.professionsSeed.create();
        } catch(error) {
            
        }
        try {
            await this.peoplesSeed.create();
        } catch(error) {
            
        }

        try {
            await this.filmsSeed.create()
        } catch(error) {
            
        }
    }
}