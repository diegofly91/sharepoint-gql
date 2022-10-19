import { UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginSiteDto, Token } from '../dtos';
import { ISitePayload } from '../interfaces';
import { AuthGuard } from '../guards/';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard)
    @Query()
    siteCurrent(@Context('site') site: ISitePayload) {
        return site;
    }

    @UsePipes(new ValidationPipe())
    @Mutation(() => ISitePayload)
    async loginSite(@Args('site') site: string): Promise<Token> {
        return await this.authService.validateUser(site);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => ISitePayload)
    async refreshToken(@Context('site') site: ISitePayload): Promise<Token> {
        return await this.authService.refreshToken(site);
    }
}
