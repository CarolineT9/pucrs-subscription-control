import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { update } from './../../../node_modules/effect/src/Differ';
import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

export interface SubscriptionData {
  cod: string;
  codPlano: string;
  codCli: string;
  inicioFidelidade: Date;
  fimFidelidade: Date;
  dataUltimoPagamento: Date;
  custoFinal: number;
  descricao: string;
  
}

// application/repositories/subscription.repository.ts
export interface ISubstRepository {
  create(subscription: SubscriptionEntity): Promise<void>;
  findAll(): Promise<SubscriptionData[]>;
  findByStatus(status: 'ativa' | 'cancelada'): Promise<SubscriptionData[]>;
}

@Injectable()
export class SubsPrismaRepository implements ISubstRepository {
  constructor(private prisma: PrismaClient) {}

  async create(subscription: SubscriptionEntity): Promise<void> {
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
  async findAll(): Promise<SubscriptionData[]> {
    return await this.prisma.subscription.findMany();
  }

  async findByStatus(status: 'ativa' | 'cancelada'): Promise<SubscriptionData[]> {
    const now = new Date();
    return this.prisma.subscription.findMany({
      where:
        status === 'ativa'
          ? { fimFidelidade: { gte: now } }
          : { fimFidelidade: { lt: now } },
    });
  }
}
