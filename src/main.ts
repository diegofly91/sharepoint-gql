import { BadRequestException, ValidationError, ValidationPipe, Logger } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as http from 'http';

(async function bootstrap() {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    const logger = new Logger('Bootstrap');
    const hostname = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 8080;
    app.setGlobalPrefix('api');
    app.enableCors({ allowedHeaders: '*', origin: '*' });
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
    //await app.listen(port, () => console.log(`Server started`));
    await app.init();
    http.createServer(server).listen(port);
   // logger.log(`Server is running in ${await http.get()}/graphql`);
})();
