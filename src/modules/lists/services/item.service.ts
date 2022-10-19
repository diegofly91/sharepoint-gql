import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories';
import { Item } from '../interfaces';

@Injectable()
export class ItemService {
    constructor(private readonly _ItemRepository: ItemRepository) {}

    async getItemsByListId(token: string, siteId: string, listId: string): Promise<Item[]> {
        return await this._ItemRepository.getItemsByListId(token, siteId, listId);
    }
}
