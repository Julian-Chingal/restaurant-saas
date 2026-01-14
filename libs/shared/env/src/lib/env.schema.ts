import { z } from 'zod'

export const BaseEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test', 'staging']),
    PORT: z.coerce.number(),
    SERVICE_NAME: z.string(),
    DATABASE_URL: z.string().url(),

    AUTH0_ISSUER: z.string(),
    AUTH0_AUDIENCE: z.string(),
})