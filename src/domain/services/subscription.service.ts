import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from '../../interface/dtos/subscription/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../interface/dtos/subscription/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return 'This action adds a new subscription';
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
