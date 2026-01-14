import { Module, OnModuleInit  } from '@nestjs/common';
import { BaseEnvSchema } from './env.schema';

@Module()
export class EnvModule implements OnModuleInit {
  OnModuleInit() {
    const result = BaseEnvSchema.safeParse(process.env);
    if (!result.success) {
      console.error('Environment validation error:', result.error.format()); //! Testing
      process.exit(1);
    }
  }
}
