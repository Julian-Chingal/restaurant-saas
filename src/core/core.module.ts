import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [AppConfigModule],
})
export class CoreModule { }
