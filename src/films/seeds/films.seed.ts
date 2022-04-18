import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PeoplesService } from 'src/peoples/peoples.service';
import { GenresService } from 'src/genres/genres.service';
import { FilmsService } from '../films.service';

@Injectable()
export class FilmsSeed {
    constructor(
        private peoplesService: PeoplesService,
        private genresService: GenresService,
        private filmsService: FilmsService,
    ) {}

    @Command({ command: 'create:films', describe: 'create a films' })
    async create() {
        const fantasy = await this.genresService.getGenreByName('fantasy');
        const detective = await this.genresService.getGenreByName('detective');
        const thriller = await this.genresService.getGenreByName('thriller');
        const actor_1 = await this.peoplesService.getPeopleByName('Брюс Уиллис');

        await this.filmsService.createFims([
            {
                name: 'Шестое чувство',
                releaseDate: new Date('08-02-1999'),
                releaseDateRF: new Date('02-25-2000'),
                excerpt: `
                    <p>Детский психолог открывает жуткую тайну маленького пациента. Грандиозная мистическая драма с Брюсом Уиллисом</p>
                `,
                description: `
                    <p>Детский психиатр Малкольм Кроу сталкивается со странным случаем: девятилетнего Коула посещают страшные видения - призраки умерших.
                    Все эти люди когда-то были убиты, и теперь они обрушивают на малыша свой гнетущий страх и отчаянный гнев.</p>

                    <p>Как врач Малкольм бессилен помочь. Но как человек он пытается найти ключ к ужасному миру Коула,
                    в котором веет дыханием смерти, и распускаются страшные цветы боли.</p>
                `,
                rating: 9,
                kinopoiskID: 395,
                length: 107,
                ratingAgeLimits: 'age16',
                genres: [
                    fantasy._id,
                    detective._id,
                    thriller._id,
                ],
                peoples: [
                    actor_1._id
                ]
            }
        ]).catch(() => {});
        await this.filmsService.createFims([
            {
                name: 'Дюна',
                releaseDate: new Date('08-02-1999'),
                releaseDateRF: new Date('02-25-2000'),
                excerpt: `
                    <p>Атрейдесы прибывают на планету, где им никто не рад. Фантастический эпос Дени Вильнёва с шестью «Оскарами»</p>
                `,
                description: `
                    <p>Наследник знаменитого дома Атрейдесов Пол отправляется вместе с семьей на одну из самых опасных планет во Вселенной — Арракис.
                    Здесь нет ничего, кроме песка, палящего солнца, гигантских чудовищ и основной причины межгалактических конфликтов — невероятно ценного ресурса,
                    который называется меланж. </p>
                    
                    <p>В результате захвата власти Пол вынужден бежать и скрываться, и это становится началом его эпического путешествия.
                    Враждебный мир Арракиса приготовил для него множество тяжелых испытаний,
                    но только тот, кто готов взглянуть в глаза своему страху, достоин стать избранным.</p>
                `,
                rating: 7,
                kinopoiskID: 409424,
                length: 155,
                ratingAgeLimits: 'age12',
                genres: [
                    fantasy._id,
                    detective._id,
                    thriller._id,
                ],
                peoples: [
                    actor_1._id
                ]
            }
        ]).catch(() => {});;
    }
}