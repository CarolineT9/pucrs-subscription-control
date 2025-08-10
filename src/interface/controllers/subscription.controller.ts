

import { Controller, Get, Post, Body, Param,  BadRequestException} from '@nestjs/common';
import { CreateSubscriptionDto } from '../dtos/subscription/create-subscription.dto';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { FindAllSubsUseCase } from 'src/application/uses-cases/subscritpion/find-all-subscription.use-case';
import {SubscriptionStatusDto}  from 'src/interface/dtos/subscription/find-subscription-status.dto'
import {FindSubscriptionsByStatusUseCase} from 'src/application/uses-cases/subscritpion/find-subscription-by-status.use-case'
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly createSubsUseCase: CreateSubsUseCase,
    private readonly findAllSubsUseCase: FindAllSubsUseCase,
    private readonly findSubscriptionsByStatus: FindSubscriptionsByStatusUseCase,
   
  ) {}
   
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.createSubsUseCase.execute(createSubscriptionDto);
  }
  @Get()
  findAll() {
    return this.findAllSubsUseCase.execute()
  }

  @Get(':status')
  async getByStatus(
    @Param('status') status: string,
  ): Promise<SubscriptionStatusDto[]> {
    if (status !== 'ativa' && status !== 'cancelada') {
      throw new BadRequestException(
        'Status inválido. Use "ativa" ou "cancelada".',
      );
    }

    return this.findSubscriptionsByStatus.execute(status as 'ativa' | 'cancelada');
  }

 
 
}
