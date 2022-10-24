import { Injectable } from '@nestjs/common';
import { JsonFile } from '../scalar';
import { UploadJsonRepository } from '../repositories/json.repository';

@Injectable()
export class UploadService {
    constructor(private readonly uploadJsonRepository: UploadJsonRepository) {}

    async getMetadataGlobalProd(): Promise<any> {
        return await this.uploadJsonRepository.getMetadataGlobalProd();
    }

    async getMetadataGlobalDev(): Promise<any> {
        return await this.uploadJsonRepository.getMetadataGlobalDev();
    }

    async deploymentMetadataProd(): Promise<boolean> {
        return await this.uploadJsonRepository.deploymentMetadataProd();
    }

    async uploadMetadataJsonDev(data: []): Promise<string> {
        return await this.uploadJsonRepository.uploadMetadataJsonDev(data);
    }

    async uploadMetadataDev(file: any): Promise<string> {
        return await this.uploadJsonRepository.uploadMetadataDev(file);
    }
}
