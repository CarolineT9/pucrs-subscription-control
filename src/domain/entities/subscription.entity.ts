import crypto from 'crypto';
export type SubscriptionProps = {
  codPlano: string;
  codCli: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;
}

export class SubscriptionEntity {
  cod: string;
  codPlano: string;
  codCli: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;

  constructor(props: SubscriptionProps, cod?: string) {
    Object.assign(this, props);
    this.cod = cod ?? crypto.randomUUID();
  }

  getStatus(): 'ativa' | 'cancelada' {
    return new Date() > this.fimFidelidade ? 'cancelada' : 'ativa';
  }
}


