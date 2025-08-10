import { CreateSubscriptionDto } from './../../../interface/dtos/subscription/create-subscription.dto';
import { Inject, Injectable } from "@nestjs/common";
import { ISubstRepository } from "src/infra/repositories/subscription.repository";
import { SubscriptionEntity, SubscriptionProps } from 'src/domain/entities/subscription.entity';
@Injectable()
export class CreateSubsUseCase{
  constructor(
    @Inject('ISubstRepository')
    private readonly subsRepo: ISubstRepository){}


    async execute(input: CreateSubscriptionDto) {
  const props: SubscriptionProps = {
    codPlano: input.codPlano,
    codCli: input.codCli,
    inicioFidelidade: new Date(input.inicioFidelidade),
    fimFidelidade: new Date(input.fimFidelidade),
    dataUltimoPagamento: new Date(input.dataUltimoPagamento),
    custoFinal: input.custoFinal,
    descricao: input.descricao,
  };

  const subscription = new SubscriptionEntity(props);

  await this.subsRepo.create(subscription);
  return subscription;
}



}