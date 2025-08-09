
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionService } from '../../domain/services/subscription.service';
import { CreateSubscriptionDto } from '../dtos/subscription/create-subscription.dto';
import { UpdateSubscriptionDto } from '../dtos/subscription/update-subscription.dto';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly createSubsUseCase: CreateSubsUseCase) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.createSubsUseCase.execute(createSubscriptionDto);
  }



  // @Get()
  // findAll() {
  //   return this.subscriptionService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subscriptionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
  //   return this.subscriptionService.update(+id, updateSubscriptionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subscriptionService.remove(+id);
  // }
}
