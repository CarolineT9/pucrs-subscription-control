import { Injectable, Inject } from '@nestjs/common';
import { CreateClientDto } from '../../interface/dtos/client/create-client.dto';

import { Client } from '../entities/client.entity';
import { IClientRepository } from '../../infra/repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepo: IClientRepository,
  ) {}

  

  async findAll() {
    return await this.clientRepo.findAll();
  }
}