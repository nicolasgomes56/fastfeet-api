import { DatabaseModule } from '@/infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { CreateAccountController } from './account/create-account.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  exports: [],
})
export class HttpModule {}
