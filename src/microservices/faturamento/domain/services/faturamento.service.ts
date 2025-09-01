import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { PagamentoDto } from '../../interface/dtos/pagamento.dto';

@Injectable()
export class FaturamentoService {
  private prisma: PrismaClient;

  constructor(
    @Inject('PLANOS_ATIVOS_SERVICE') private planosAtivosClient: ClientProxy,
    @Inject('GESTAO_SERVICE') private gestaoClient: ClientProxy
  ) {
    this.prisma = new PrismaClient();
  }

  async processarFaturamento(data: any) {
    // Implementação do processamento de faturamento
    console.log('Processando faturamento:', data);
    return {
      status: 'processado',
      data,
      timestamp: new Date(),
    };
  }

  async registrarPagamento(pagamentoDto: PagamentoDto) {
    console.log('Registrando pagamento:', pagamentoDto);
    
    // Criar o pagamento no banco de dados
    const pagamento = await this.prisma.pagamento.create({
      data: {
        dia: pagamentoDto.dia,
        mes: pagamentoDto.mes,
        ano: pagamentoDto.ano,
        codAssinatura: pagamentoDto.codAssinatura,
        valorPago: pagamentoDto.valorPago,
        dataPagamento: new Date(),
      },
    });

    // Emitir eventos para outros serviços
    this.notificarPagamentoGestao(pagamentoDto);
    this.notificarPagamentoPlanosAtivos(pagamentoDto);

    return {
      status: 'registrado',
      pagamento,
    };
  }

  async notificarPagamentoGestao(pagamentoDto: PagamentoDto) {
    // Emitir evento para o serviço de gestão
    this.gestaoClient.emit('PagamentoPlanoServicoGestao', pagamentoDto);
    console.log('Evento PagamentoPlanoServicoGestao emitido:', pagamentoDto);
    return true;
  }

  async notificarPagamentoPlanosAtivos(pagamentoDto: PagamentoDto) {
    // Emitir evento para o serviço de planos ativos
    this.planosAtivosClient.emit('PagamentoPlanoServicoPlanosAtivos', pagamentoDto);
    console.log('Evento PagamentoPlanoServicoPlanosAtivos emitido:', pagamentoDto);
    return true;
  }
}