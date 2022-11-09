import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import * as fs from 'fs-extra';

const configService = new ConfigService();
// definimos la ruta
const crPath = configService.get('SSL_CERTIFICATE');
const pkPath = configService.get('SSL_CERTIFICATE_KEY');
const options: any = {};

// validamos si los archivos existen
if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
    // cargamos los archivos sobre las options
    options.httpsOptions = {
        cert: fs.readFileSync(crPath),
        key: fs.readFileSync(pkPath),
    };
}

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, options);
    const logger = new Logger('Bootstrap');
    const host = AppModule.host || '127.0.0.1';
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
    await app.listen(port, host);
    logger.log(`Server is running in ${await app.getUrl()}/graphql`);
})();
