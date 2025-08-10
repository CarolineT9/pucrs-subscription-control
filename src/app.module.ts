import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './domain/modules/client.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PlanModule } from './domain/modules/plan.module';
import { SubscriptionModule } from './domain/modules/subscription.module';
import { SubscriptionClientController } from 'src/interface/controllers/subscription-client.controller';
import { SubscriptionPlanController } from 'src/interface/controllers/subscription-plan.controller';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    PlanModule,
    SubscriptionModule
  ],
  controllers: [AppController, SubscriptionClientController, SubscriptionPlanController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}