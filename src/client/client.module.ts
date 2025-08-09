import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { CreateClientUseCase } from './uses-cases/create-client.use-case';
import { FindAllClientUseCase } from './uses-cases/find-all.use-case';
import { ClienTypeOrmRepository } from './client.repository';


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
