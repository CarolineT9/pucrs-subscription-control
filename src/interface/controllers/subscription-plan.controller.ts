import { Controller, Get, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FindSubscriptionByPlanUseCase } from '../../application/uses-cases/subscritpion/find-subscription-by-plan.use-case';
import { SubscriptionStatusDto } from 'src/interface/dtos/subscription/find-subscription-status.dto';

@ApiTags('assinaturas-plano')
@Controller('subscriptionplan')
export class SubscriptionPlanController {
  constructor(
    private readonly findSubscriptionByPlanUseCase: FindSubscriptionByPlanUseCase
  ) {}

  @Get(':codPlano')
  @ApiOperation({ summary: 'Listar assinaturas por plano' })
  @ApiParam({ name: 'codPlano', description: 'UUID do plano', type: 'string' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas do plano retornada com sucesso', type: [SubscriptionStatusDto] })
  @ApiResponse({ status: 400, description: 'Nenhuma assinatura encontrada para este plano' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
  async getByCodPlano(
    @Param('codPlano', new ParseUUIDPipe({ version: '4' })) codPlano: string,
  ): Promise<SubscriptionStatusDto[]> {
    const result = await this.findSubscriptionByPlanUseCase.execute(codPlano);

    if (result.length === 0) {
      throw new BadRequestException('Nenhuma assinatura encontrada para este plano.');
    }

    return result;
  }
}