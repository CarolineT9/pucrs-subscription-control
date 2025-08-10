// interface/dtos/subscription-status.dto.ts


export class SubscriptionStatusDto {
 
  codSubscription: string;

  
  codCli: string;

  
  codPlano: string;

 
  inicioFidelidade: Date;

 
  fimFidelidade: Date;

  
  status: 'ativa' | 'cancelada';
}
