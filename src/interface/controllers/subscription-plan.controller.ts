import { Controller, Get, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { FindSubscriptionByPlanUseCase } from '../../application/uses-cases/subscritpion/find-subscription-by-plan.use-case';
import { SubscriptionStatusDto } from 'src/interface/dtos/subscription/find-subscription-status.dto';

@Controller('subscriptionplan')
export class SubscriptionPlanController {
  constructor(
    private readonly findSubscriptionByPlanUseCase: FindSubscriptionByPlanUseCase
  ) {}

  @Get(':codPlano')
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