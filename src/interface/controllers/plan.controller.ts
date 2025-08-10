import { UpdatePlanCostUseCase } from './../../application/uses-cases/plan/update-plan.use-case';
import { FindAllPlanUseCase } from '../../application/uses-cases/plan/find-all-plan.use-case';
import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdatePlanDto } from '../dtos/plan/update-plan.dto';

@ApiTags('planos')
@Controller('plan')
export class PlanController {
  constructor(
    private readonly findAllPlanUseCase: FindAllPlanUseCase,
    private readonly updatePlanCostUseCase: UpdatePlanCostUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os planos' })
  @ApiResponse({ status: 200, description: 'Lista de planos retornada com sucesso' })
  findAll() {
    return this.findAllPlanUseCase.execute();
  }

  @Patch(':cod')
  @ApiOperation({ summary: 'Atualizar custo mensal de um plano' })
  @ApiParam({ name: 'cod', description: 'UUID do plano' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({ status: 200, description: 'Plano atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  update(@Param('cod') cod: string, @Body() updatePlanDto: UpdatePlanDto) {
    if (updatePlanDto.custoMensal === undefined) {
      throw new BadRequestException('custoMensal é obrigatório');
    }

    return this.updatePlanCostUseCase.execute(cod, updatePlanDto.custoMensal);
  }
}
