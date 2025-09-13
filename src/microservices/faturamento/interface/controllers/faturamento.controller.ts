import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FaturamentoService } from '../../domain/services/faturamento.service';

@Controller()
export class FaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  @MessagePattern('processar_faturamento')
  async processarFaturamento(@Payload() data: any) {
    return this.faturamentoService.processarFaturamento(data);
  }
}