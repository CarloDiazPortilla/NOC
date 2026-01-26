import "dotenv/config";
import env from 'env-var';

const { get } = env;

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  PROD: get('PROD').required().asBool(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASS: get('MONGO_PASS').required().asString(),
  POSTGRES_URL: get('POSTGRES_URL').required().asString()
}