import { Module } from '@nestjs/common';
import { ListRepository, ItemRepository, ColumnRepository } from './repositories';
import { ListResolver, ItemResolver, ColumnResolver } from './resolvers';
import { ListService, ItemService, ColumnService } from './services';
import { AuthModule } from '../auth/auth.module';
import { ConfigHttp } from '@/config/config.http';

@Module({
    imports: [AuthModule, ConfigHttp],
    providers: [
        ListService,
        ColumnResolver,
        ColumnService,
        ColumnRepository,
        ListRepository,
        ListResolver,
        ItemRepository,
        ItemResolver,
        ItemService,
    ],
    exports: [ListService, ListRepository, ItemService, ColumnService],
})
export class ListModule {}
