import { update } from './../../../node_modules/effect/src/Differ';
import { Injectable } from "@nestjs/common"

import { PrismaClient } from "@prisma/client"

export interface Subscription {
  cod: string;
  codPlano: string;
  codCli: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;
}


export interface ISubstRepository {
  create(subscription: Subscription): Promise<void>
  findAll(): Promise<Subscription[]>
}

@Injectable()
export class SubsPrismaRepository implements ISubstRepository {
  constructor(private prisma: PrismaClient) {}

async create(subscription: Subscription): Promise<void> {
  await this.prisma.subscription.create({
    data: {
      codPlano: subscription.codPlano,
      codCli: subscription.codCli,
      inicioFidelidade: new Date(subscription.inicioFidelidade),
      fimFidelidade: new Date(subscription.fimFidelidade),
      dataUltimoPagamento: new Date(subscription.dataUltimoPagamento),
      custoFinal: subscription.custoFinal,
      descricao: subscription.descricao,
    },
  });
}



async findAll(): Promise<Subscription[]> {
  return await this.prisma.subscription.findMany();
  
}
}