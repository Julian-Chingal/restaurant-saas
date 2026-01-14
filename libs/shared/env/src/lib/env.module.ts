import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './env.schema';
import { validationSchema } from './env.validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  exports: [ConfigModule],
})
export class EnvModule {}
