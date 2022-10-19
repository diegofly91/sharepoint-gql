import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Token {
    @IsString()
    @IsNotEmpty()
    access_token: string;

    @IsNumber()
    @IsNotEmpty()
    expiration: number;
}
