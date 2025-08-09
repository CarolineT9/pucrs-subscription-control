import { Module } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionController } from '../../interface/controllers/subscription.controller';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { SubsPrismaRepository } from 'src/infra/repositories/subscription.repository';
@Module({
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    CreateSubsUseCase,
    SubsPrismaRepository,
    {
      provide: 'ISubstRepository',
      useExisting: SubsPrismaRepository
    }
  ],
})
export class SubscriptionModule {}
