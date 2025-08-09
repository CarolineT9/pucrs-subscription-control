import { Module } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientController } from '../../interface/controllers/client.controller';
import { CreateClientUseCase } from '../../application/uses-cases/create-client.use-case';
import { FindAllClientUseCase } from '../../application/uses-cases/find-all.use-case';
import { ClientPrismaRepository } from '../../infra/repositories/client.repository';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService, 
    CreateClientUseCase, 
    FindAllClientUseCase, 
    ClientPrismaRepository,
    {
      provide: 'IClientRepository',
      useExisting: ClientPrismaRepository
    }
  ],
})
export class ClientModule {}