import * as fs from 'fs-extra';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UploadJsonRepository {
    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {
        fs.mkdirsSync(this.configService.get('DIR_LOCAL'), { recursive: true });
    }

    async getBlobClient(imageName: string): Promise<BlockBlobClient> {
        const containerName = this.configService.get('DIR_STORAGE_METADATA');
        const blobClientService = BlobServiceClient.fromConnectionString(
            this.configService.get('AZURE_STOTAGE_CONNECTION_STRING'),
        );
        const blobClient = blobClientService.getContainerClient(containerName);
        await blobClient.createIfNotExists({ access: 'container' });
        return blobClient.getBlockBlobClient(imageName);
    }

    async uploadMetadataJsonDev(data: []): Promise<string> {
        const filePath = `${await this.configService.get('DIR_LOCAL')}/${this.configService.get('FILE_METADATA_DEV')}`;
        await fs.writeFileSync(filePath, JSON.stringify(data));
        const blobkClient = await this.getBlobClient(this.configService.get('FILE_METADATA_DEV'));
        await blobkClient.uploadFile(filePath);
        await this.deleteVideo(filePath);
        return blobkClient.url;
    }

    async deploymentMetadataProd(): Promise<boolean> {
        const fileMetadataDev = this.configService.get('FILE_METADATA_DEV');
        const FilePath = `${this.configService.get('DIR_LOCAL')}/${fileMetadataDev}`;
        const sourceBlob = await this.getBlobClient(fileMetadataDev);
        await sourceBlob.downloadToFile(FilePath);
        const stream = fs.createReadStream(FilePath);
        const blobkClient = await this.getBlobClient(this.configService.get('FILE_METADATA_PROD'));
        await blobkClient.uploadStream(stream);
        await this.deleteVideo(FilePath);
        return !!blobkClient.url;
    }

    async uploadMetadataDev(file: any): Promise<string> {
        const { FilePath } = await this.storeUpload(file);
        const stream = fs.createReadStream(FilePath);
        const blobkClient = await this.getBlobClient(this.configService.get('FILE_METADATA_DEV'));
        await blobkClient.uploadStream(stream);
        await this.deleteVideo(FilePath);
        return blobkClient.url;
    }

    private storeUpload = async (file): Promise<any> => {
        const { createReadStream, filename, mimetype } = await file;
        const name = `${Date.now().toString()}-${filename}`;
        const FilePath = `${await this.configService.get('DIR_LOCAL')}/${name}`;
        return new Promise((resolve, reject) =>
            createReadStream()
                .pipe(fs.createWriteStream(FilePath))
                .on('finish', () => resolve({ name, FilePath, mimetype }))
                .on('error', reject),
        );
    };

    private deleteVideo = async (path: string) => {
        return await fs.unlinkSync(path);
    };

    async getMetadataGlobalProd(): Promise<any> {
        try {
            const blobkClient = await this.getBlobClient(this.configService.get('FILE_METADATA_PROD'));
            const { data } = await this.httpService.axiosRef.get(blobkClient.url);
            return data;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.FOUND);
        }
    }

    async getMetadataGlobalDev(): Promise<any> {
        try {
            const blobkClient = await this.getBlobClient(this.configService.get('FILE_METADATA_DEV'));
            const { data } = await this.httpService.axiosRef.get(blobkClient.url);
            return data;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.FOUND);
        }
    }
}
