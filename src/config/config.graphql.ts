import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

export const GraphQL = GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [],
    useFactory: async () => ({
        installSubscriptionHandlers: false,
        typePaths: ['./**/graphql/*.graphql'],
        introspection: true,
        playground: true,
        //debug: configService.get('GRAPHQL_DEGUB') === 'true',
        context: ({ req, connection }) => (connection ? { headers: connection.context } : { headers: req.headers }),
        formatError: (error) => new Error(error.message),
    }),
    inject: [],
});
