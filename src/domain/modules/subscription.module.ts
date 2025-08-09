import { Module } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionController } from '../../interface/controllers/subscription.controller';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { SubsPrismaRepository } from 'src/infra/repositories/subscription.repository';
import { FindAllSubsUseCase } from 'src/application/uses-cases/subscritpion/find-all-subscription.use-case';

@Module({
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    CreateSubsUseCase,
    FindAllSubsUseCase,
    SubsPrismaRepository,
    {
      provide: 'ISubstRepository',
      useExisting: SubsPrismaRepository
    }
  ],
})
export class SubscriptionModule {}
