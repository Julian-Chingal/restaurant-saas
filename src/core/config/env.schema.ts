import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.string().transform(Number).default(3000),

    DATABASE_URL: z.string().url(),

    AUTH0_DOMAIN: z.string(),
    AUTH0_AUDIENCE: z.string(),
});
