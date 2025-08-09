import { Injectable, Inject } from '@nestjs/common';
import { CreateClientDto } from '../../interface/dtos/create-client.dto';
import { UpdateClientDto } from '../../interface/dtos/update-client.dto';
import { Client } from '../entities/client.entity';
import { IClientRepository } from '../../infra/repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepo: IClientRepository,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = new Client(createClientDto);
    await this.clientRepo.create(client);
  }

  async findAll() {
    return await this.clientRepo.findAll();
  }
}