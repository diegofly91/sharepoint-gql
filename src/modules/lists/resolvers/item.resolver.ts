import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ItemService } from '../services';
import { Item } from '../interfaces';
import { AuthGuard } from '@/modules/auth/guards/';
import { ISitePayload } from '@/modules/auth/interfaces';
import { FilterDecorator, TopDecorator } from '../decorators';

@Resolver()
export class ItemResolver {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(AuthGuard)
    @Query()
    public async getItemsByListId(
        @Context('site') { token, id }: ISitePayload,
        @FilterDecorator() filter: string,
        @TopDecorator() top: number,
        @Args('listId') listId: string,
    ): Promise<Item[]> {
        return await this.itemService.getItemsByListId(token, id, listId, filter, top);
    }
}
