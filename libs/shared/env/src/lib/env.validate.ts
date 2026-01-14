import * as Joi from 'joi';

export const validationSchema = Joi.object({
	NODE_ENV: Joi.string().valid('development', 'production', 'test', 'staging').default('development'),
	PORT: Joi.number().default(3333),
	DATABASE_URL: Joi.string().uri().allow(''),
	JWT_SECRET: Joi.string().min(8).allow(''),
});
