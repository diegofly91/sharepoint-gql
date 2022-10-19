import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQL } from './config/index';
import { AuthModule } from './modules/auth/auth.module';
import { ListModule } from './modules/lists/list.module';
import { JSONObjectScalar } from '@/modules/lists/scalar';
import { UploadModule } from './modules/upload/upload.module';
import { JsonFile } from './modules/upload/scalar';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), GraphQL, AuthModule, ListModule, UploadModule],
    providers: [JSONObjectScalar, JsonFile],
})
export class AppModule {
    static host: string;
    static port: number;

    constructor(private readonly configService: ConfigService) {
        AppModule.host = this.configService.get('HOST');
        AppModule.port = +this.configService.get('PORT');
    }
}
