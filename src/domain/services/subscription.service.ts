import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateSubscriptionDto } from '../../interface/dtos/subscription/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../interface/dtos/subscription/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject('FATURAMENTO_SERVICE') private faturamentoClient: ClientProxy,
    @Inject('PLANOS_ATIVOS_SERVICE') private planosAtivosClient: ClientProxy,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return 'This action adds a new subscription';
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }

  async criarAssinatura(data: any) {
    // Lógica para criar assinatura
    
    // Enviar mensagem para o microsserviço de faturamento
    const resultadoFaturamento = await firstValueFrom(
      this.faturamentoClient.send('processar_faturamento', {
        assinaturaId: data.id,
        valor: data.custoFinal,
      })
    );
    
    // Enviar mensagem para o microsserviço de planos ativos
    const resultadoPlanosAtivos = await firstValueFrom(
      this.planosAtivosClient.send('listar_planos_ativos', {
        clienteId: data.codCli,
      })
    );
    
    return {
      assinatura: data,
      faturamento: resultadoFaturamento,
      planosAtivos: resultadoPlanosAtivos,
    };
  }
}
