import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface ApplicationConfig {
  environment?: string;
  port?: string;
}

export default registerAs('users', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage')
      .required(),
    port: Joi.number().port(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`
    );
  }

  return config;
});
