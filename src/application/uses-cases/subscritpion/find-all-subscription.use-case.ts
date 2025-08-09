import { Injectable, Inject } from "@nestjs/common";
import { ISubstRepository } from "src/infra/repositories/subscription.repository";


@Injectable()
export class FindAllSubsUseCase{
  constructor(
    @Inject('ISubstRepository')
    private readonly subsRepo: ISubstRepository){}

  execute(){
     
        return this.subsRepo.findAll();;
  }
}