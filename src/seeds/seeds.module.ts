import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { GenresSeed } from 'src/genres/seeds/genres.seed';
import { GenresModule } from 'src/genres/genres.module';
import { RolesModule } from 'src/roles/roles.module';
import { RolesSeed } from 'src/roles/seeds/roles.seed';
import { UsersModule } from 'src/users/users.module';
import { UsersSeed } from 'src/users/seeds/users.seed';
import { ProfessionsSeed } from 'src/professions/seeds/professions.seed';
import { GeneralSeed } from './seeds.service';
import { ProfessionsModule } from 'src/professions/professions.module';
import { PeoplesModule } from 'src/peoples/peoples.module';
import { PeoplesSeed } from 'src/peoples/seeds/peoples.seed';
import { FilmsModule } from 'src/films/films.module';
import { FilmsSeed } from 'src/films/seeds/films.seed';

@Module({
    imports: [
        CommandModule,
        GenresModule,
        RolesModule,
        UsersModule,
        ProfessionsModule,
        PeoplesModule,
        FilmsModule,
    ],
    providers: [
        GenresSeed,
        RolesSeed,
        GeneralSeed,
        UsersSeed,
        ProfessionsSeed,
        PeoplesSeed,
        FilmsSeed,
    ],
    exports: [
        GenresSeed,
        RolesSeed,
        GeneralSeed,
        UsersSeed,
        ProfessionsSeed,
        PeoplesSeed,
        FilmsSeed,
    ],
})
export class SeedsModule {}