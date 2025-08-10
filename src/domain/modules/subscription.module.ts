import { Module } from '@nestjs/common';
import { SubscriptionController } from '../../interface/controllers/subscription.controller';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { FindAllSubsUseCase } from 'src/application/uses-cases/subscritpion/find-all-subscription.use-case';
import { FindSubscriptionsByStatusUseCase } from 'src/application/uses-cases/subscritpion/find-subscription-by-status.use-case';
import { SubsPrismaRepository } from 'src/infra/repositories/subscription.repository';

@Module({
  controllers: [SubscriptionController],
  providers: [
    CreateSubsUseCase,
    FindAllSubsUseCase,
    FindSubscriptionsByStatusUseCase,
    SubsPrismaRepository,
    {
      provide: 'ISubstRepository',
      useExisting: SubsPrismaRepository,
    },
  ],
  exports: ['ISubstRepository', FindSubscriptionsByStatusUseCase], // exporte se for usado em outros módulos
})
export class SubscriptionModule {}
