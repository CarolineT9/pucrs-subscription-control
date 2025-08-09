import crypto from 'crypto';

export class Subscription {
  cod: string;
  codPlano: string;
  codCli: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string; 

  constructor(
    props: Omit<Subscription, 'cod'>, //pega todos os parametros
    cod?: string
  ) {
    Object.assign(this, props);
    this.cod = cod ?? crypto.randomUUID();
  }
}

