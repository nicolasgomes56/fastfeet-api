import { randomUUID } from 'node:crypto';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'DELIVERY_MAN']);

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').default('DELIVERY_MAN').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
