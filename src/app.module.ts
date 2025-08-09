import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './domain/modules/client.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}