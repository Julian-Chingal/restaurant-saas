import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit' as never, () => {
            void app.close().catch((err) => {
                console.error('Error closing app:', err);
            });
        });
    }
}
