import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { SharedModule } from './shared/shared.module';
import { FilmsModule } from './films/films.module';
import { PeoplesModule } from './peoples/peoples.module';
import { ProfessionsModule } from './professions/professions.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const ENV_TYPE = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveStaticOptions: {
                redirect: false,
                index: false,
            },
            serveRoot: '/public/'
        }),
        ConfigModule.forRoot({
            envFilePath: `${ENV_TYPE}.env`,
        }),
        MongooseModule.forRoot(`mongodb://mongo_nestjs_container/${process.env.DB_NAME}`),
        UsersModule,
        RolesModule,
        AuthModule,
        GenresModule,
        SharedModule,
        FilmsModule,
        PeoplesModule,
        ProfessionsModule,
        FilesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}