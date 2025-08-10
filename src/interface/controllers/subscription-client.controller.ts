import { Controller, Get, Param, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FindSubscriptionByClientUseCase } from '../../application/uses-cases/subscritpion/find-subscription-by-cod-cli.use-case';
import {SubscriptionStatusDto}  from 'src/interface/dtos/subscription/find-subscription-status.dto'
@ApiTags('assinaturas-cliente')
@Controller('subscription-client')
export class SubscriptionClientController {
  constructor(
    private readonly findSubscriptionByClientUseCase: FindSubscriptionByClientUseCase
  ) {}


  @Get(':codCli')
  @ApiOperation({ summary: 'Listar assinaturas por cliente' })
  @ApiParam({ name: 'codCli', description: 'UUID do cliente', type: 'string' })
  @ApiResponse({ status: 200, description: 'Lista de assinaturas do cliente retornada com sucesso', type: [SubscriptionStatusDto] })
  @ApiResponse({ status: 400, description: 'Nenhuma assinatura encontrada para este cliente' })
  @ApiResponse({ status: 400, description: 'UUID inválido' })
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
