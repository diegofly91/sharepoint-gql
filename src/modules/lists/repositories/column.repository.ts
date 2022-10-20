import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JSONObject } from '../interfaces';

@Injectable()
export class ColumnRepository {
    constructor(private readonly httpService: HttpService) {}

    async getColumnsByListId(token: string, siteId: string, listId: string): Promise<JSONObject[]> {
        try {
            const { data } = await this.httpService.axiosRef.get(
                `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/columns`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return data.value;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
