import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Context } from '@nestjs/graphql';
import { ColumnService } from '../services';
import { JSONObject } from '../interfaces';
import { AuthGuard } from '@/modules/auth/guards/';
import { ISitePayload } from '@/modules/auth/interfaces';

@Resolver()
export class ColumnResolver {
    constructor(private readonly columnService: ColumnService) {}

    @UseGuards(AuthGuard)
    @Query()
    public async getColumnsByListId(
        @Context('site') { token, id }: ISitePayload,
        @Args('listId') listId: string,
    ): Promise<JSONObject[]> {
        return await this.columnService.getColumnsByListId(token, id, listId);
    }
}
