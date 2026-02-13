import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

@Module({
  imports: [MikroOrmModule.forRoot({
    driver: PostgreSqlDriver,
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    clientUrl: process.env.DATABASE_URL,
    debug: process.env.NODE_ENV !== 'production',
  })],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
