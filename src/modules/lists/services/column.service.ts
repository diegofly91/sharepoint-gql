import { Injectable } from '@nestjs/common';
import { ColumnRepository } from '../repositories';
import { JSONObject } from '../interfaces';

@Injectable()
export class ColumnService {
    constructor(private readonly _columnRepository: ColumnRepository) {}

    async getColumnsByListId(token: string, siteId: string, listId: string): Promise<JSONObject[]> {
        return await this._columnRepository.getColumnsByListId(token, siteId, listId);
    }
}
