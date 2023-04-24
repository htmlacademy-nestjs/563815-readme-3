import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

export interface FilesConfig {
  serveRoot?: string;
  environment?: string;
  uploadDirectory?: string;
  port?: string;
  db: {
    host?: string;
    port?: string;
    user?: string;
    name?: string;
    password?: string;
    authBase?: string;
  };
}

export default registerAs('files', (): FilesConfig => {
  const config: FilesConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: process.env.PORT,
    db: {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
  };

  const validationSchema = Joi.object<FilesConfig>({
    serveRoot: Joi.string().required(),
    environment: Joi.string()
      .valid('development', 'production', 'stage')
      .required(),
    port: Joi.number().port().required(),
    uploadDirectory: Joi.string().required(),
    db: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().required(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Files Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`
    );
  }

  return config;
});
