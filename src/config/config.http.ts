import { HttpModule } from '@nestjs/axios';
import { ConfigService, ConfigModule } from '@nestjs/config';

export const ConfigHttp = HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        timeout: 10000,
        maxRedirects: 10,
    }),
    inject: [ConfigService],
});
