import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginSiteDto {
    @MaxLength(120, { message: 'the name site is long caracteres' })
    @IsString()
    @IsOptional()
    site: string;
}
