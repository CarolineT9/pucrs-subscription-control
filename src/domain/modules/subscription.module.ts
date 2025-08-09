import { Module } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionController } from '../../interface/controllers/subscription.controller';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
