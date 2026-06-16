import process from 'node:process';
import { Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import * as schema from './drizzle/schema';

export const DRIZZLE = Symbol('DRIZZLE');

const drizzleProvider: Provider = {
  provide: DRIZZLE,
  useFactory: () => {
    const queryClient = postgres(process.env.DATABASE_URL!, {
      max: 10,
    });

    return drizzle(queryClient, { schema });
  },
};

@Module({
  providers: [drizzleProvider],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
