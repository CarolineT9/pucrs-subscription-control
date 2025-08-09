

export class CreateSubscriptionDto {
  codCli: string
  codPlano: string
  inicioFidelidade: Date
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;
}
