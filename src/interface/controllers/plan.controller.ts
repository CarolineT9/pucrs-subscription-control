
import { UpdatePlanCostUseCase } from './../../application/uses-cases/plan/update-plan.use-case';
import { FindAllPlanUseCase } from '../../application/uses-cases/plan/find-all-plan.use-case';
import { Controller, Get, Param, Patch, Body, BadRequestException } from '@nestjs/common';
import { UpdatePlanDto } from '../dtos/plan/update-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(
    private readonly findAllPlanUseCase: FindAllPlanUseCase,
    private readonly updatePlanCostUseCase: UpdatePlanCostUseCase
  ) {}

  @Get()
  findAll() {
    return this.findAllPlanUseCase.execute();
  }

  @Patch(':cod')
update(@Param('cod') cod: string, @Body() updatePlanDto: UpdatePlanDto) {
  if (updatePlanDto.custoMensal === undefined) {
    throw new BadRequestException('custoMensal é obrigatório');
  }

  return this.updatePlanCostUseCase.execute(
    cod,
    updatePlanDto.custoMensal
  );
}

}