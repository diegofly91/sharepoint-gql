import { Scalar, CustomScalar } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';

export type JsonFileProps = Promise<FileUpload>;

@Scalar('JsonFile')
export class JsonFile implements CustomScalar<JsonFileProps, JsonFileProps> {
    description = 'Upload custom scalar type';
    supportedFormats = ['application/json'];

    async parseValue(value: any) {
        const { file } = await value;
        const { mimetype } = file;
        if (!this.supportedFormats.includes(mimetype)) {
            throw new BadRequestException(`Unsupported file format. Supports: ${this.supportedFormats.join(' ')}.`);
        }
        return file;
    }

    serialize(value: any) {
        return value?.file;
    }

    parseLiteral(ast: any) {
        return ast;
    }
}
