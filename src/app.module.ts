/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from './modules/health/health.module';
// import { PlansModule } from './modules/admin/plans/plans.module';
import { CoreModule } from './core/core.module';


@Module({
  imports: [
    // Config Module
    CoreModule,
    
    // GraphQL Module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),

    // Modules
    HealthModule,
    // PlansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
