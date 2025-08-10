import { Inject, Injectable } from '@nestjs/common';
import { ISubstRepository } from '../../../infra/repositories/subscription.repository';
import { SubscriptionStatusDto } from '../../../interface/dtos/subscription/find-subscription-status.dto';

@Injectable()
export class FindSubscriptionByPlanUseCase {
  constructor(
    @Inject('ISubstRepository')
    private readonly subsRepository: ISubstRepository
  ) {}

  async execute(codPlano: string): Promise<SubscriptionStatusDto[]> {
    const subscriptions = await this.subsRepository.findByPlanId(codPlano);

    return subscriptions.map(sub => ({
      codSubscription: sub.cod,
      codCli: sub.codCli,
      codPlano: sub.codPlano,
      inicioFidelidade: sub.inicioFidelidade,
      fimFidelidade: sub.fimFidelidade,
      dataUltimoPagamento: sub.dataUltimoPagamento,
      custoFinal: sub.custoFinal,
      descricao: sub.descricao,
      status: new Date() > sub.fimFidelidade ? 'cancelada' : 'ativa',
    }));
  }
}