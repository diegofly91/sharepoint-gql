import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    /*   async validate(dto: LoginUserDto): Promise<any> {
        const user = await this.authService.validateUser(dto);
        if (!user) throw new UnauthorizedException('El usuario o la contraseña no coincide.');
        return user;
    } */
}
