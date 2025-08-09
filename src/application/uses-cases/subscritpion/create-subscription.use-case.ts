import { CreateSubscriptionDto } from './../../../interface/dtos/subscription/create-subscription.dto';
import { Inject, Injectable } from "@nestjs/common";
import { ISubstRepository } from "src/infra/repositories/subscription.repository";
import { Subscription } from 'src/domain/entities/subscription.entity';
@Injectable()
export class CreateSubsUseCase{
  constructor(
    @Inject('ISubstRepository')
    private readonly subsRepo: ISubstRepository){}


    async execute(input: CreateSubscriptionDto){
      const subscription = new Subscription(input);
      await this.subsRepo.create(subscription)
      return subscription
    }


}