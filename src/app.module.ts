/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppConfigModule } from './core/config/config.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Config Module
    AppConfigModule,

    // GraphQL Module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),

    // Modules
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
