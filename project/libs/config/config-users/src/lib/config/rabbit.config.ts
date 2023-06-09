import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface RabbitConfig {
  host?: string;
  password?: string;
  user?: string;
  queue?: string;
  exchange: string;
  port?: string;
}

export default registerAs('rabbit', (): RabbitConfig => {
  const config: RabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: process.env.RABBIT_PORT,
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE || 'readme.notify',
  };

  const validationSchema = Joi.object<RabbitConfig>({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().required(),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`
    );
  }

  return config;
});
