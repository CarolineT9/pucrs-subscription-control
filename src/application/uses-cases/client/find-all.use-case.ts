
import { Injectable, Inject } from "@nestjs/common";
import { IClientRepository } from "../../../infra/repositories/client.repository";


@Injectable()
export class FindAllClientUseCase{
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepo: IClientRepository){}

  execute(){
     
        return this.clientRepo.findAll();;
  }
}