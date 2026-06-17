import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { DatabaseModule } from './infrastructure/database/database.module';
import { HttpModule } from './presentation/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
