import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Item } from '../interfaces';

@Injectable()
export class ItemRepository {
    constructor(private readonly httpService: HttpService) {}

    async getItemsByListId(
        token: string,
        siteId: string,
        listId: string,
        filter: string,
        top: number,
    ): Promise<Item[]> {
        try {
            const { data } = await this.httpService.axiosRef.get(
                `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/Items?expand=fields${filter}${top}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly',
                    },
                },
            );
            return data.value;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
