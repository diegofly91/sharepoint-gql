import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services';
import { AuthRepository } from './repositories/auth.repository';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy, LocalStrategy } from './strategies';
import { ConfigService } from '@nestjs/config';
import { ConfigHttp } from '@/config/config.http';

@Module({
    imports: [
        ConfigHttp,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '10d' },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver, AuthRepository],
    exports: [PassportModule, JwtModule, AuthService, AuthRepository],
})
export class AuthModule {}
