const configuration = () => ({
	nodeEnv: process.env.NODE_ENV ?? 'development',
	port: parseInt(process.env.PORT ?? '3333', 10),
	databaseUrl: process.env.DATABASE_URL ?? '',
	jwtSecret: process.env.JWT_SECRET ?? '',
});

export type EnvConfig = ReturnType<typeof configuration>;

export default configuration;
