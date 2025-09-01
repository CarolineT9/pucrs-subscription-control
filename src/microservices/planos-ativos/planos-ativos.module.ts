import { Module } from '@nestjs/common';
import { PlanosAtivosController } from './interface/controllers/planos-ativos.controller';
import { PlanosAtivosService } from './domain/services/planos-ativos.service';

@Module({
  controllers: [PlanosAtivosController],
  providers: [PlanosAtivosService],
})
export class PlanosAtivosModule {}