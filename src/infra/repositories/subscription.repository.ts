
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
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
  findByClientId(codCli: string): Promise<SubscriptionData[]>;
  findByPlanId(codPlano: string): Promise<SubscriptionData[]>;
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
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    return this.prisma.subscription.findMany({
      where:
        status === 'ativa'
          ? { dataUltimoPagamento: { gte: thirtyDaysAgo } }
          : { dataUltimoPagamento: { lt: thirtyDaysAgo } },
    });
  }
  async findByClientId(codCli: string): Promise<SubscriptionData[]> {
  return await this.prisma.subscription.findMany({
    where: { codCli },
  });
}

async findByPlanId(codPlano: string): Promise<SubscriptionData[]> {
  return await this.prisma.subscription.findMany({
    where: { codPlano },
  });
}

}
