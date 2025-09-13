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

  @Post('register')
  @ApiOperation({ summary: 'Webhook para receber pagamentos da operadora' })
  @ApiResponse({ status: 200, description: 'Pagamento processado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos do webhook' })
  async webhookPagamento(@Body() webhookData: any) {
    console.log('Webhook recebido da operadora:', webhookData);
    
    // Transformar dados do webhook para o formato interno
    const pagamentoDto: PagamentoDto = {
      dia: new Date().getDate(),
      mes: new Date().getMonth() + 1,
      ano: new Date().getFullYear(),
      codAssinatura: webhookData.subscription_id || webhookData.codAssinatura,
      valorPago: webhookData.amount || webhookData.valor || webhookData.valorPago
    };

    // Processar o pagamento através do microsserviço
    const resultado = await firstValueFrom(
      this.faturamentoClient.send('registrar_pagamento', pagamentoDto)
    );
    
    return {
      status: 'webhook_processado',
      pagamento: resultado,
      timestamp: new Date()
    };
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