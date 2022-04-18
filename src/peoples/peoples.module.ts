import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeoplesController } from './peoples.controller';
import { People, PeopleSchema } from './peoples.schema';
import { PeoplesService } from './peoples.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
              {
                name: People.name,
                schema: PeopleSchema,
              },
            ],
        ),
    ],
    controllers: [
      PeoplesController,
    ],
    providers: [
      PeoplesService,
    ],
    exports: [
      PeoplesService,
    ],
})
export class PeoplesModule {}