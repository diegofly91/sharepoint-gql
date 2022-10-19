import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { List } from '../interfaces';

@Injectable()
export class ListRepository {
    constructor(private readonly httpService: HttpService) {}

    async getListBySiteId(token: string, siteId: string): Promise<List[]> {
        try {
            const { data } = await this.httpService.axiosRef.get(
                `https://graph.microsoft.com/v1.0/sites/${siteId}/lists`,
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
