import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { PrismaClientLike } from './prisma.factory';

export const PRISMA_CLIENT = Symbol('PRISMA_CLIENT');

@Injectable()
export class PrismaService<T extends PrismaClientLike> implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(PRISMA_CLIENT)
        private readonly prismaClient: T
    ) {}

    get client(): T {
        return this.prismaClient;
    }

    async onModuleInit() {
        await this.prismaClient.$connect();
    }

    async onModuleDestroy() {
        await this.prismaClient.$disconnect();
    }
}