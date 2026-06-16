import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

/**
 * Configuração do Drizzle ORM
 */
export default defineConfig({
  schema: './src/infra/database/drizzle/schema/*',
  out: './src/infra/database/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});