
import { CreateClientDto } from "../../interface/dtos/client/create-client.dto";
import { Client } from "../../domain/entities/client.entity";
import { Injectable, Inject } from "@nestjs/common";
import { IClientRepository } from "../../infra/repositories/client.repository";

@Injectable()
export class CreateClientUseCase{
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepo: IClientRepository){}

 async execute(input: CreateClientDto){
     const client = new Client(input);
        await this.clientRepo.create(client);
        return client;
  }
}

//Hexagonal architeture => Ports and adapters 