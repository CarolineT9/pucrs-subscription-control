import { Module } from '@nestjs/common';
import { PlanService } from '../services/plan.service';
import { PlanController } from '../../interface/controllers/plan.controller';

@Module({
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
