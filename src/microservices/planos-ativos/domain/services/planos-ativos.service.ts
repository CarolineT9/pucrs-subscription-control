import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlanosAtivosService {
  private prisma: PrismaClient;
  private planosAtivosCache: Map<string, boolean> = new Map();

  constructor() {
    this.prisma = new PrismaClient();
    this.inicializarCache();
  }

  private async inicializarCache() {
    // Carregar assinaturas ativas do banco de dados para o cache
    const assinaturas = await this.prisma.subscription.findMany();
    
    for (const assinatura of assinaturas) {
      const ativa = new Date() <= assinatura.fimFidelidade;
      this.planosAtivosCache.set(assinatura.cod, ativa);
    }
    
    console.log(`Cache inicializado com ${this.planosAtivosCache.size} assinaturas`);
  }

  async listarPlanosAtivos(data: any) {
    console.log('Listando planos ativos para:', data);
    
    // Buscar assinaturas ativas para o cliente
    const assinaturas = await this.prisma.subscription.findMany({
      where: {
        codCli: data.clienteId,
        fimFidelidade: { gte: new Date() }
      },
      include: {
        Plan: true
      }
    });
    
    return {
      planos: assinaturas.map(a => ({
        id: a.codPlano,
        nome: a.Plan.nome,
        status: 'ativo',
        assinaturaId: a.cod
      })),
      timestamp: new Date(),
    };
  }

  async verificarPlanoAtivo(codass: string): Promise<boolean> {
    console.log(`Verificando se plano com assinatura ${codass} está ativo`);
    
    // Verificar no cache primeiro
    if (this.planosAtivosCache.has(codass)) {
      // Fix the type error by providing a default value if undefined
      return this.planosAtivosCache.get(codass) ?? false;
    }
    
    // Se não estiver no cache, buscar no banco de dados
    const assinatura = await this.prisma.subscription.findUnique({
      where: { cod: codass }
    });
    
    if (!assinatura) {
      return false;
    }
    
    const ativa = new Date() <= assinatura.fimFidelidade;
    
    // Atualizar o cache
    this.planosAtivosCache.set(codass, ativa);
    
    return ativa;
  }

  async atualizarStatusPagamento(data: any) {
    console.log('Atualizando status de pagamento:', data);
    
    const { codAssinatura } = data;
    
    // Atualizar a data do último pagamento na assinatura
    await this.prisma.subscription.update({
      where: { cod: codAssinatura },
      data: { dataUltimoPagamento: new Date() }
    });
    
    // Atualizar o cache
    this.planosAtivosCache.set(codAssinatura, true);
    
    return true;
  }
}