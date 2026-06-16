import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController],
  exports: [],
})
export class HttpModule {}
