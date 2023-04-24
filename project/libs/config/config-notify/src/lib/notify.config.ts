import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface NotifyConfig {
  environment?: string;
  port?: string;
  db: {
    host?: string;
    port?: string;
    user?: string;
    name?: string;
    password?: string;
    authBase?: string;
  };
  rabbit: {
    host?: string;
    password?: string;
    user?: string;
    queue?: string;
    exchange: string;
    port?: string;
  };
  mail: {
    host?: string;
    port?: string;
    user?: string;
    password?: string;
    from?: string;
  };
}

export default registerAs('notify', (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: process.env.RABBIT_PORT,
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE || 'readme.notify',
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    },
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage')
      .required(),
    port: Joi.number().port().required(),
    db: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().required(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().required(),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
    }),
    mail: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
    }),
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
