import { Module } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientController } from '../../interface/controllers/client.controller';

import { FindAllClientUseCase } from '../../application/uses-cases/client/find-all.use-case';
import { ClientPrismaRepository } from '../../infra/repositories/client.repository';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService, 
   
    FindAllClientUseCase, 
    ClientPrismaRepository,
    {
      provide: 'IClientRepository',
      useExisting: ClientPrismaRepository
    }
  ],
})
export class ClientModule {}