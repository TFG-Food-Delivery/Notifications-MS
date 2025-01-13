import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  EMAIL_HOST: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    EMAIL_HOST: joi.string().required(),
    EMAIL_USERNAME: joi.string().required(),
    EMAIL_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  emailHost: envVars.EMAIL_HOST,
  emailUsername: envVars.EMAIL_USERNAME,
  emailPassword: envVars.EMAIL_PASSWORD,
};
