import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FaturamentoService } from '../../domain/services/faturamento.service';
import { PagamentoDto } from '../dtos/pagamento.dto';

@Controller()
export class FaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  @MessagePattern('processar_faturamento')
  async processarFaturamento(@Payload() data: any) {
    return this.faturamentoService.processarFaturamento(data);
  }

  @MessagePattern('registrar_pagamento')
  async registrarPagamento(@Payload() pagamentoDto: PagamentoDto) {
    return this.faturamentoService.registrarPagamento(pagamentoDto);
  }
}