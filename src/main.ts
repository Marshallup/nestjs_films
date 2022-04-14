import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from "@nestjs/common";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    app.setGlobalPrefix('/api');
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Урок по бекенду')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('UBNI')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    
    

    await app.listen(PORT, () => {
        Logger.log(`!!-----------Server start ${PORT}------------!!`);
    });
}

start();