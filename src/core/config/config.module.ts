import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';
import { ConfigService } from './config.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: (config) => envSchema.parse(config),
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule { }
