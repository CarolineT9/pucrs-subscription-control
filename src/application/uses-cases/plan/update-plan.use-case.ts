// application/use-cases/update-plan-cost.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import { IPlanRepository } from 'src/infra/repositories/plan.repository';
import { Plan } from 'src/domain/entities/plan.entity';

@Injectable()
export class UpdatePlanCostUseCase {
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepository: IPlanRepository
  
  ) {}

  async execute(cod: string, custoMensal: number): Promise<Plan> {
    if (custoMensal <= 0) {
      throw new Error('Custo mensal deve ser maior que zero');
    }

    return await this.planRepository.update({
      cod: cod,
      custoMensal
    } as Plan);
  }
}
