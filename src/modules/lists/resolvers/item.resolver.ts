import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { ItemService } from '../services';
import { Item } from '../interfaces';
import { AuthGuard } from '@/modules/auth/guards/';
import { ISitePayload } from '@/modules/auth/interfaces';

@Resolver()
export class ItemResolver {
    constructor(private readonly itemService: ItemService) {}

    @UseGuards(AuthGuard)
    @Query()
    public async getItemsByListId(
        @Context('site') { token, id }: ISitePayload,
        @Args('listId') listId: string,
    ): Promise<Item[]> {
        return await this.itemService.getItemsByListId(token, id, listId);
    }
}
