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

    return subscriptions.map((sub) => ({
      codSubscription: sub.cod,
      codCli: sub.codCli,
      codPlano: sub.codPlano,
      inicioFidelidade: sub.inicioFidelidade,
      fimFidelidade: sub.fimFidelidade,
      status: new Date() > sub.fimFidelidade ? 'cancelada' : 'ativa',
    }));
  }
}
