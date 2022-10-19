import { Module } from '@nestjs/common';
import { UploadResolver } from './resolvers';
import { UploadService } from './services';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UploadJsonRepository } from './repositories';
import { ConfigHttp } from '@/config/config.http';

@Module({
    imports: [AuthModule, ConfigModule, ConfigHttp],
    providers: [UploadService, UploadResolver, UploadJsonRepository],
    exports: [UploadService, UploadJsonRepository],
})
export class UploadModule {}
