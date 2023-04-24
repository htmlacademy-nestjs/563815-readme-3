import { DatabaseEnvironment } from '../database-environment';
import { plainToInstance } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';

export interface DbConfig {
  host?: string;
  name?: string;
  port?: string;
  user?: string;
  password?: string;
  authBase?: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    name: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  const databaseEnvironment = plainToInstance(DatabaseEnvironment, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(databaseEnvironment, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return config;
});
