import { ClassConstructor, plainToInstance } from 'class-transformer';
import { genSalt, hash } from 'bcrypt';

export { getMongooseOptions } from './db';
export { getRabbitMQOptions } from './brokers';
export { getMailerAsyncOptions } from './mail';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function getMongoConnectionString(options: {
  username?: string;
  password?: string;
  host?: string;
  port?: string;
  databaseName?: string;
  authDatabase?: string;
}): string {
  const optionsKeys = Object.keys(options);

  if (optionsKeys.some((option) => option == null)) {
    throw new Error('Not enough options to connect to MongoDB');
  }

  return `mongodb://${options.username}:${options.password}@${options.host}:${options.port}/${options.databaseName}?authSource=${options.authDatabase}`;
}

export function getRabbitMQConnectionString(options: {
  user?: string;
  password?: string;
  host?: string;
  port?: string;
}): string {
  const optionsKeys = Object.keys(options);

  if (optionsKeys.some((option) => option == null)) {
    throw new Error('Not enough options to connect to RabbitMQ');
  }

  return `amqp://${options.user}:${options.password}@${options.host}:${options.port}`;
}

export async function generatePassword(password: string): Promise<string> {
  const salt = await genSalt(10);
  return hash(password, salt);
}
