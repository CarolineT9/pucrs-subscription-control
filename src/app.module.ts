import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './domain/modules/client.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PlanModule } from './domain/modules/plan.module';
import { SubscriptionModule } from './domain/modules/subscription.module';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    PlanModule,
    SubscriptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}