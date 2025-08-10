import { Module } from '@nestjs/common';
import { SubscriptionController } from '../../interface/controllers/subscription.controller';
import { SubscriptionPlanController } from '../../interface/controllers/subscription-plan.controller';

// Use-cases
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { FindAllSubsUseCase } from 'src/application/uses-cases/subscritpion/find-all-subscription.use-case';
import { FindSubscriptionsByStatusUseCase } from 'src/application/uses-cases/subscritpion/find-subscription-by-status.use-case';
import { FindSubscriptionByClientUseCase } from 'src/application/uses-cases/subscritpion/find-subscription-by-cod-cli.use-case';
import { FindSubscriptionByPlanUseCase } from 'src/application/uses-cases/subscritpion/find-subscription-by-plan.use-case';

// Repositório
import { SubsPrismaRepository } from 'src/infra/repositories/subscription.repository';

@Module({
  controllers: [SubscriptionController, SubscriptionPlanController],
  providers: [
    // Repositório e binding com token
    SubsPrismaRepository,
    {
      provide: 'ISubstRepository',
      useExisting: SubsPrismaRepository,
    },
    // Use-cases
    CreateSubsUseCase,
    FindAllSubsUseCase,
    FindSubscriptionsByStatusUseCase,
    FindSubscriptionByClientUseCase,
    FindSubscriptionByPlanUseCase,
  ],
  exports: [
    'ISubstRepository',
    FindSubscriptionsByStatusUseCase,
    FindSubscriptionByClientUseCase,
    FindSubscriptionByPlanUseCase,
  ],
})
export class SubscriptionModule {}
