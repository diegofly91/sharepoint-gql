import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UploadService } from '../services';
import { AuthGuard } from '@/modules/auth/guards/';

@Resolver()
export class UploadResolver {
    constructor(private readonly uploadService: UploadService) {}

    @UseGuards(AuthGuard)
    @Query()
    async getMetadataGlobalProd(): Promise<any> {
        return await this.uploadService.getMetadataGlobalProd();
    }

    @UseGuards(AuthGuard)
    @Query()
    async getMetadataGlobalDev(): Promise<any> {
        return await this.uploadService.getMetadataGlobalDev();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean, { nullable: true })
    public async deploymentMetadataProd(): Promise<boolean> {
        return await this.uploadService.deploymentMetadataProd();
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Boolean, { nullable: true })
    public async uploadMetadataDev(@Args('file') file: any): Promise<string> {
        return await this.uploadService.uploadMetadataDev(file);
    }
}
