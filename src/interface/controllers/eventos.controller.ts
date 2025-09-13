import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PagamentoDto } from '../../microservices/faturamento/interface/dtos/pagamento.dto';
import { PrismaClient } from '@prisma/client';

@Controller()
export class EventosController {
  private readonly logger = new Logger(EventosController.name);
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  @EventPattern('PagamentoPlanoServicoGestao')
  async handlePagamentoPlano(@Payload() pagamentoDto: PagamentoDto) {
    this.logger.log('Evento PagamentoPlanoServicoGestao recebido:', pagamentoDto);
    
    try {
      // Atualizar a data do último pagamento na assinatura
      const assinaturaAtualizada = await this.prisma.subscription.update({
        where: {
          cod: pagamentoDto.codAssinatura
        },
        data: {
          dataUltimoPagamento: new Date()
        }
      });

      this.logger.log(`Assinatura ${pagamentoDto.codAssinatura} atualizada com sucesso`);
      
      return {
        status: 'processado',
        assinatura: assinaturaAtualizada,
        timestamp: new Date()
      };
    } catch (error) {
      this.logger.error('Erro ao processar evento de pagamento:', error);
      throw error;
    }
  }
}