import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DrizzleDB } from '../../@types/drizzle';
import { DRIZZLE } from './database.module';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(DRIZZLE)
    private readonly drizzle: DrizzleDB
  ) {}

  async onModuleInit() {
    await this.drizzle.
  }

  async onModuleDestroy() {}
}