import { Injectable, Inject } from "@nestjs/common";
import {IPlanRepository} from '../../infra/repositories/plan.repository'


@Injectable()
export class FindAllPlanUseCase{
  constructor(
    @Inject('IPlanRepository')
    private readonly planRepo: IPlanRepository){}

  execute(){
     
        return this.planRepo.findAll();;
  }
}