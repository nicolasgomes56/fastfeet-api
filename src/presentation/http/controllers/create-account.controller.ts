import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import type { DrizzleDB } from '@/infra/database/database.module';
import { DRIZZLE } from '@/infra/database/database.module';
import { users } from '@/infra/database/drizzle/schema';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
export class CreateAccountController {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const [userAlreadyExists] = await this.db.select().from(users).where(eq(users.email, email));

    if (userAlreadyExists) {
      throw new ConflictException('User with same e-mail already exists.');
    }

    const hashPassword = await hash(password, 8);

    await this.db.insert(users).values({
      name,
      email,
      password: hashPassword,
    });
  }
}
