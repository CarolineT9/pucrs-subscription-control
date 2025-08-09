import { FindAllPlanUseCase } from '../../application/uses-cases/plan/find-all-plan.use-case';
import { Controller, Get } from '@nestjs/common';

@Controller('plan')
export class PlanController {
  constructor(
    
    private readonly FindAllPlanUseCase: FindAllPlanUseCase
  ) {}


  @Get()
  findAll() {
    return this.FindAllPlanUseCase.execute()
  }

}
