import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}
  create(createClientDto: CreateClientDto) {
    const client = new Client(createClientDto);

    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find();
  }

  findOne(cod: string) {
    return this.clientRepo.findOneOrFail({ where: { cod } });
  }

  async update(cod: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepo.findOneOrFail({ where: { cod } });

    updateClientDto.nome && (client.nome = updateClientDto.nome);
    updateClientDto.email && (client.email = updateClientDto.email);

    return this.clientRepo.save(client);
  }

  remove(cod: string) {
    return `This action removes a #${cod} client`;
  }
}
