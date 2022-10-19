import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ISite } from '../interfaces';

@Injectable()
export class AuthRepository {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

    async loginMsGraph(): Promise<string> {
        try {
            const { data } = await this.httpService.axiosRef.post(
                `https://login.microsoftonline.com/${this.configService.get('TENANT_ID')}/oauth2/v2.0/token`,
                `grant_type=client_credentials&
                    scope=${this.configService.get('SCOPE')}&
                    client_secret=${this.configService.get('CLIENT_SECRET')}&
                    client_id=${this.configService.get('CLIENT_ID')}
                `,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );
            return data.access_token;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }

    async getSiteData(token: string, site?: string): Promise<ISite> {
        try {
            const url = site
                ? `https://graph.microsoft.com/v1.0/sites/${this.configService.get(
                      'TENANT_NAME',
                  )}.sharepoint.com:/sites/${site}`
                : `https://graph.microsoft.com/v1.0/sites/${this.configService.get('TENANT_NAME')}.sharepoint.com`;

            const { data } = await this.httpService.axiosRef.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
