import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

const MIN_PORT = 0;
const MAX_PORT = 65535;

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}

export class DatabaseEnvironment {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  @IsOptional()
  public name?: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  @IsOptional()
  public host?: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  @IsOptional()
  public port?: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  @IsOptional()
  public user?: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  @IsOptional()
  public password?: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  @IsOptional()
  public authBase?: string;
}
