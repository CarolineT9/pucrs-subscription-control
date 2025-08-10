import { Controller, Get, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { FindSubscriptionByClientUseCase } from '../../application/uses-cases/subscritpion/find-subscription-by-cod-cli.use-case';
import {SubscriptionStatusDto}  from 'src/interface/dtos/subscription/find-subscription-status.dto'
@Controller('subscription-client')
export class SubscriptionClientController {
  constructor(
    private readonly findSubscriptionByClientUseCase: FindSubscriptionByClientUseCase
  ) {}


  @Get(':codCli')
    async getByCodCli(
      @Param('codCli', new ParseUUIDPipe({ version: '4' })) codCli: string,
    ): Promise<SubscriptionStatusDto[]> {
      const result = await this.findSubscriptionByClientUseCase.execute(codCli);
  
      if (result.length === 0) {
        throw new BadRequestException('Nenhuma assinatura encontrada para este cliente.');
      }
  
      return result;
    }

}
