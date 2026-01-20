import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService, PRISMA_CLIENT } from './prisma.service';
import { createPrismaClient, PrismaConnectionConfig } from './prisma.factory';

export interface PrismaModuleOptions extends PrismaConnectionConfig {
  /**
   * Constructor del PrismaClient generado para el microservicio
   */
  prismaClientConstructor: new (config: any) => any;
  /**
   * Si el módulo debe ser global (por defecto: true)
   */
  isGlobal?: boolean;
}

/**
 * Módulo de Prisma reutilizable para todos los microservicios
 * Soporta configuración dinámica con diferentes PrismaClients generados
 */
@Module({})
export class PrismaModule {
  /**
   * Configurar el módulo de Prisma con un PrismaClient específico
   * 
   * @param options - Opciones de configuración del módulo
   * @returns Módulo dinámico configurado
   * 
   * @example
   * ```typescript
   * import { PrismaClient } from './generated/prisma/client';
   * 
   * @Module({
   *   imports: [
   *     PrismaModule.forRoot({
   *       prismaClientConstructor: PrismaClient,
   *     }),
   *   ],
   * })
   * export class AppModule {}
   * ```
   */
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    const { prismaClientConstructor, isGlobal = true, ...config } = options;

    const { prismaClient, pool } = createPrismaClient(
      prismaClientConstructor,
      config
    );

    const prismaClientProvider = {
      provide: PRISMA_CLIENT,
      useValue: prismaClient,
    };

    const poolProvider = {
      provide: 'PG_POOL',
      useValue: pool,
    };

    return {
      global: isGlobal,
      module: PrismaModule,
      providers: [prismaClientProvider, poolProvider, PrismaService],
      exports: [PrismaService, PRISMA_CLIENT],
    };
  }

  /**
   * Configurar el módulo de Prisma de forma asíncrona
   * Útil cuando necesitas obtener la configuración de otros servicios
   * 
   * @param options - Opciones de configuración asíncrona
   * @returns Módulo dinámico configurado
   */
  static forRootAsync(options: {
    isGlobal?: boolean;
    useFactory: (...args: any[]) => Promise<PrismaModuleOptions> | PrismaModuleOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      global: options.isGlobal ?? true,
      module: PrismaModule,
      providers: [
        {
          provide: 'PRISMA_MODULE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: PRISMA_CLIENT,
          useFactory: async (moduleOptions: PrismaModuleOptions) => {
            const { prismaClientConstructor, ...config } = moduleOptions;
            const { prismaClient } = createPrismaClient(
              prismaClientConstructor,
              config
            );
            return prismaClient;
          },
          inject: ['PRISMA_MODULE_OPTIONS'],
        },
        PrismaService,
      ],
      exports: [PrismaService, PRISMA_CLIENT],
    };
  }
}
