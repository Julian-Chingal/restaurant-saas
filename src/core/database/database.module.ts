import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../../mikro-orm.config' 

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
 