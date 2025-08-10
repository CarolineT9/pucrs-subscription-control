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
  // Função auxiliar para converter string ou Date para Date
  const parseDate = (date: string | Date): Date => {
    if (date instanceof Date) {
      return date;
    }
    
    // Verifica se está no formato YYYY/MM/DD HH:MM
    const datePattern = /^(\d{4})\/(\d{2})\/(\d{2})\s(\d{2}):(\d{2})$/;
    const match = date.match(datePattern);
    
    if (match) {
      const [_, year, month, day, hours, minutes] = match;
      return new Date(
        parseInt(year),
        parseInt(month) - 1, // Mês em JavaScript é 0-indexed
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );
    }
    
    // Caso contrário, tenta converter normalmente
    return new Date(date);
  };
  
  const props: SubscriptionProps = {
    codPlano: input.codPlano,
    codCli: input.codCli,
    inicioFidelidade: parseDate(input.inicioFidelidade),
    fimFidelidade: parseDate(input.fimFidelidade),
    dataUltimoPagamento: parseDate(input.dataUltimoPagamento),
    custoFinal: input.custoFinal,
    descricao: input.descricao,
  };

  const subscription = new SubscriptionEntity(props);

  await this.subsRepo.create(subscription);
  return subscription;
}



}