import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const pgAdapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter: pgAdapter });

async function main() {
  if ((await prisma.tenantStatus.count()) !== 0) {
    console.log('No ejecutar tenant status');
    return;
  } else {
    const tenantStatuses = [
      {
        id: 'ACTIVE',

        description: 'Cliente ativo y operacional.',
      },
      {
        id: 'TRIAL',
        description: 'Cliente en período de prueba.',
      },
      {
        id: 'SUSPENDED',
        description:
          'Cliente suspendido por falta de pago o violación de términos.',
      },
      {
        id: 'CANCELLED',
        description: 'Cliente que ha cancelado su suscripción.',
      },
    ];

    for (const status of tenantStatuses) {
      await prisma.tenantStatus.upsert({
        where: { id: status.id },
        update: {},
        create: status,
      });
    }
  }

  if ((await prisma.subscriptionStatus.count()) !== 0) {
    console.log('No Ejecutar Subscription Status');
    return;
  } else {
    const subscriptionStatuses = [
      {
        id: 'ACTIVE',
        description: 'Suscripción activa.',
      },
      {
        id: 'PAST_DUE',
        description: 'Fallo en el pago, reintentando',
      },
      {
        id: 'UNPAID',
        description: 'Suscripción terminada',
      },
      {
        id: 'CANCELLED',
        description: 'Suscripción que ha cancelado su suscripción.',
      },
    ];

    for (const status of subscriptionStatuses) {
      await prisma.subscriptionStatus.upsert({
        where: { id: status.id },
        update: {},
        create: status,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
