import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { z } from 'zod';
import { envSchema } from './env.schema';

type EnvVars = z.infer<typeof envSchema>;

@Injectable()
export class ConfigService {
    constructor(private readonly configService: NestConfigService<EnvVars, true>) { }

    get<T extends keyof EnvVars>(key: T): EnvVars[T] {
        return this.configService.get(key, { infer: true });
    }
}
