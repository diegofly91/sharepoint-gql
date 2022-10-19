import { Module } from '@nestjs/common';
import { ListRepository, ItemRepository } from './repositories';
import { ListResolver, ItemResolver } from './resolvers';
import { ListService, ItemService } from './services';
import { AuthModule } from '../auth/auth.module';
import { ConfigHttp } from '@/config/config.http';

@Module({
    imports: [AuthModule, ConfigHttp],
    providers: [ListService, ListRepository, ListResolver, ItemRepository, ItemResolver, ItemService],
    exports: [ListService, ListRepository, ItemService],
})
export class ListModule {}
