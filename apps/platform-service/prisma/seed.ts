import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const pgAdapter = new PrismaPg(connectionString)
const prisma = new PrismaClient({ adapter: pgAdapter })

async function main() {
  if ((await prisma.tenantStatus.count()) !== 0) {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });