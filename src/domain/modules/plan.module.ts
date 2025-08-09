import { Module } from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { PlanPrismaRepository } from '../../infra/repositories/plan.repository';
import { PlanController } from 'src/interface/controllers/plan.controller';
import { FindAllPlanUseCase } from 'src/application/uses-cases/plan/find-all-plan.use-case';

@Module({
  controllers:[PlanController],
  providers: [
    PlanService,
    FindAllPlanUseCase,
    PlanPrismaRepository,
    {
      provide: 'IPlanRepository',
      useExisting: PlanPrismaRepository
    }
  ],
  exports: [PlanService, FindAllPlanUseCase],
  
})
export class PlanModule {}