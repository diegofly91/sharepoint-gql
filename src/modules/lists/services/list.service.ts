import { Injectable } from '@nestjs/common';
import { ListRepository } from '../repositories';
import { List } from '../interfaces';

@Injectable()
export class ListService {
    constructor(private readonly _listRepository: ListRepository) {}

    async getListBySiteId(token: string, siteId: string): Promise<List[]> {
        return await this._listRepository.getListBySiteId(token, siteId);
    }
}
