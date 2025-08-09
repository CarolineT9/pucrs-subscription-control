import { Module } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientController } from '../../interface/controllers/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientUseCase } from '../../application/uses-cases/create-client.use-case';
import { FindAllClientUseCase } from '../../application/uses-cases/find-all.use-case';
import { ClienTypeOrmRepository } from '../../infra/repositories/client.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [
    ClientService, 
    CreateClientUseCase, 
    FindAllClientUseCase, 
    ClienTypeOrmRepository,
    {
      provide: 'IClientRepository',
      useExisting:ClienTypeOrmRepository
    }
  
  ],
})
export class ClientModule {}
