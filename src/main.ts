import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as express from 'express';

const configService = new ConfigService();
// definimos la ruta
const options: any = {};

(async function bootstrap() {
    const server = express();
    const app = await NestFactory.create(AppModule, options);
    const logger = new Logger('Bootstrap');
   //const host = AppModule.host || '127.0.0.1';
    const port = process.env.PORT || 3000;
    app.setGlobalPrefix('api');
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                const errorMessages = errors.map((error) => Object.values(error.constraints));
                return new BadRequestException(errorMessages.toString());
            },
            forbidUnknownValues: false,
            transform: true,
            whitelist: true,
        }),
    );
    app.use(graphqlUploadExpress({ maxFiles: 2, maxFileSize: 100000000 }));
    await app.init();
    http.createServer(server).listen(port || 443);
    //await app.listen(port, host);
    //logger.log(`Server is running in ${await app.getUrl()}/graphql`);
})();
