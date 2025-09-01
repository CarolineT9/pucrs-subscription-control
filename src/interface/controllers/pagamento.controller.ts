import { Body, Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PagamentoDto } from '../../microservices/faturamento/interface/dtos/pagamento.dto';

@ApiTags('pagamentos')
@Controller('pagamento')
export class PagamentoController {
  constructor(
    @Inject('FATURAMENTO_SERVICE') private faturamentoClient: ClientProxy,
    @Inject('PLANOS_ATIVOS_SERVICE') private planosAtivosClient: ClientProxy,
  ) {}

  @Post('registrar')
  @ApiOperation({ summary: 'Registrar um novo pagamento' })
  @ApiBody({ type: PagamentoDto })
  @ApiResponse({ status: 201, description: 'Pagamento registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async registrarPagamento(@Body() pagamentoDto: PagamentoDto) {
    // Enviar mensagem para o microsserviço de faturamento
    const resultado = await firstValueFrom(
      this.faturamentoClient.send('registrar_pagamento', pagamentoDto)
    );
    
    return resultado;
  }

  @Get('plano-ativo/:codass')
  @ApiOperation({ summary: 'Verificar se um plano está ativo' })
  @ApiResponse({ status: 200, description: 'Status do plano retornado com sucesso' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  async verificarPlanoAtivo(@Param('codass') codass: string) {
    // Enviar mensagem para o microsserviço de planos ativos
    const resultado = await firstValueFrom(
      this.planosAtivosClient.send('verificar_plano_ativo', { codass })
    );
    
    return {
      codAssinatura: codass,
      ativo: resultado,
      verificadoEm: new Date()
    };
  }
}