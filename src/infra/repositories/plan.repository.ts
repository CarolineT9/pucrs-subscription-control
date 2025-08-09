import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { Plan } from "src/domain/entities/plan.entity"

export interface IPlanRepository {
  update(plan: Plan): Promise<Plan>
  findAll(): Promise<Plan[]>
}

@Injectable()
export class PlanPrismaRepository implements IPlanRepository {
  constructor(private prisma: PrismaClient) {}

async update(plan: Plan): Promise<Plan> {
  return await this.prisma.plan.update({
    where: { cod: plan.cod }, // precisa ser unique no banco
    data: { custoMensal: plan.custoMensal }
  })
}


  async findAll(): Promise<Plan[]> {
  return await this.prisma.plan.findMany();
}
}