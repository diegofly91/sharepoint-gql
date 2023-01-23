import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from '../enums';

export class FilterDto {
    @IsNotEmpty()
    @IsString()
    column: string;

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsString()
    type: keyof typeof Type;
}
