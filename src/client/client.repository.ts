import { Repository } from "typeorm"
import { Client } from "./entities/client.entity"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

export interface IClientRepository{
  create(client: Client): Promise<void>
  findAll(): Promise<Client[]>
}

@Injectable()
export class ClienTypeOrmRepository implements IClientRepository{
  constructor(
     @InjectRepository(Client)
    private typeOrmRepo: Repository<Client>){
  }
  async create(client: Client): Promise<void> {
    await this.typeOrmRepo.save(client)
  }
  async findAll(): Promise<Client[]> {
    return await this.typeOrmRepo.find()
  }

}
