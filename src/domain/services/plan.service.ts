import { Inject, Injectable } from '@nestjs/common';
import { IPlanRepository } from 'src/infra/repositories/plan.repository';

@Injectable()
export class PlanService {

 constructor(
  @Inject('IPlanRepository')
  private  readonly planRepo: IPlanRepository
 ){}
 

  async findAll() {
    return await this.planRepo.findAll();
  }

  
}
