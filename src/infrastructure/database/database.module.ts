import { Global, Module } from '@nestjs/common';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const DRIZZLE = Symbol('DRIZZLE_CONNECTION');

export type DrizzleDB = PostgresJsDatabase;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const client = postgres(process.env.DATABASE_URL as string);
        return drizzle(client);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
