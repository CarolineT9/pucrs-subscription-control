import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { PlanosAtivosService } from '../../domain/services/planos-ativos.service';

@Controller()
export class PlanosAtivosController {
  constructor(private readonly planosAtivosService: PlanosAtivosService) {}

  @MessagePattern('listar_planos_ativos')
  async listarPlanosAtivos(@Payload() data: any) {
    return this.planosAtivosService.listarPlanosAtivos(data);
  }

  @MessagePattern('verificar_plano_ativo')
  async verificarPlanoAtivo(@Payload() data: { codass: string }) {
    return this.planosAtivosService.verificarPlanoAtivo(data.codass);
  }

  @EventPattern('PagamentoPlanoServicoPlanosAtivos')
  async handlePagamentoPlano(@Payload() data: any) {
    return this.planosAtivosService.atualizarStatusPagamento(data);
  }
}