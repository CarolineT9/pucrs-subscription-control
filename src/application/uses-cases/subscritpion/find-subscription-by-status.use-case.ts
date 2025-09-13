// application/use-cases/list-subscriptions-by-status.usecase.ts
import { Inject, Injectable } from '@nestjs/common';
import { ISubstRepository } from '../../../infra/repositories/subscription.repository';
import { SubscriptionStatusDto } from '../../../interface/dtos/subscription/find-subscription-status.dto';

@Injectable()
export class FindSubscriptionsByStatusUseCase {
  constructor(
    @Inject('ISubstRepository')
    private subsRepository: ISubstRepository
  
  ) {}

  async execute(status: 'ativa' | 'cancelada'): Promise<SubscriptionStatusDto[]> {
    const subscriptions = await this.subsRepository.findByStatus(status);

    return subscriptions.map((sub) => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      const isActive = sub.dataUltimoPagamento >= thirtyDaysAgo;
      
      return {
        codSubscription: sub.cod,
        codCli: sub.codCli,
        codPlano: sub.codPlano,
        inicioFidelidade: sub.inicioFidelidade,
        fimFidelidade: sub.fimFidelidade,
        dataUltimoPagamento: sub.dataUltimoPagamento,
        custoFinal: sub.custoFinal,
        descricao: sub.descricao,
        status: isActive ? 'ativa' : 'cancelada',
      };
    });
  }
}
