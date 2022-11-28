import { HttpModule } from '@nestjs/axios';

export const ConfigHttp = HttpModule.registerAsync({
    useFactory: async () => ({
        timeout: 10000,
        maxRedirects: 10,
    }),
});
