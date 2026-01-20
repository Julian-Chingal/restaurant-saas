/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export interface PrismaConnectionConfig {
    databaseUrl: string;
    enableLogging?: boolean;
    logLevel?: ('query' | 'info' | 'warn' | 'error')[];
}

export interface PrismaClientLike {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
}

export interface PrismaFactoryResult<T> {
    prismaClient: T
    pool: Pool
    adapter: PrismaPg
    cleanup: () => Promise<void>
}

export function createPrismaClient<T extends PrismaClientLike>(
    PrismaClientConstructor: new (config: any) => T,
    config: PrismaConnectionConfig
): PrismaFactoryResult<T> {
    if (!config?.databaseUrl) {
        throw new Error(
            'databaseUrl is required and must be validated by the consuming microservice'
        );
    }

    const pool = new Pool({
        connectionString: config.databaseUrl,
    });

    const adapter = new PrismaPg(pool);

    const logLevel =
        config.logLevel ??
        (config.enableLogging
            ? ['query', 'error', 'warn']
            : ['error']);

    const prismaClient = new PrismaClientConstructor({
        adapter,
        log: logLevel,
    });

    return {
        prismaClient,
        pool,
        adapter,
        async cleanup() {
            await prismaClient.$disconnect();
            await pool.end();
        },
    };
}

export async function withPrismaClient<T extends PrismaClientLike, R>(
    PrismaClientConstructor: new (config: any) => T,
    config: PrismaConnectionConfig,
    fn: (prisma: T) => Promise<R>
): Promise<R> {
    const { prismaClient, cleanup } = createPrismaClient(
        PrismaClientConstructor,
        config
    );

    try {
        await (prismaClient as any).$connect();
        return await fn(prismaClient);
    } finally {
        await cleanup();
    }
}
