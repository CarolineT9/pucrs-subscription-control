

import { Controller, Get, Post, Body, Param, BadRequestException, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { CreateSubscriptionDto } from '../dtos/subscription/create-subscription.dto';
import { CreateSubsUseCase } from 'src/application/uses-cases/subscritpion/create-subscription.use-case';
import { FindAllSubsUseCase } from 'src/application/uses-cases/subscritpion/find-all-subscription.use-case';
import {SubscriptionStatusDto}  from 'src/interface/dtos/subscription/find-subscription-status.dto'
import {FindSubscriptionsByStatusUseCase} from 'src/application/uses-cases/subscritpion/find-subscription-by-status.use-case'
@ApiTags('assinaturas')
@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly createSubsUseCase: CreateSubsUseCase,
    private readonly findAllSubsUseCase: FindAllSubsUseCase,
    private readonly findSubscriptionsByStatus: FindSubscriptionsByStatusUseCase,
   
  ) {}
   
  @Post()
  @UsePipes(DateFormatPipe)
  @ApiOperation({ summary: 'Criar uma nova assinatura' })
  @ApiBody({ type: CreateSubscriptionDto })
  @ApiResponse({ status: 201, description: 'Assinatura criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.createSubsUseCase.execute(createSubscriptionDto);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas as assinaturas' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas retornada com sucesso', type: [SubscriptionStatusDto] })
  findAll() {
    return this.findAllSubsUseCase.execute()
  }

  @Get(':status')
  @ApiOperation({ summary: 'Listar assinaturas por status' })
  @ApiParam({ name: 'status', enum: ['ativa', 'cancelada'], description: 'Status da assinatura' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas por status retornada com sucesso', type: [SubscriptionStatusDto] })
  @ApiResponse({ status: 400, description: 'Status inválido' })
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
