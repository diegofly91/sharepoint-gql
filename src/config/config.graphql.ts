import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

export const GraphQL = GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        installSubscriptionHandlers: false,
        typePaths: ['./**/graphql/*.graphql'],
       // cache: 'bounded',
        introspection: true,
        playground: true,
        //debug: configService.get('GRAPHQL_DEGUB') === 'true',
        context: ({ req, connection }) => (connection ? { headers: connection.context } : { headers: req.headers }),
        formatError: (error) => new Error(error.message),
    }),
    inject: [ConfigService],
});
