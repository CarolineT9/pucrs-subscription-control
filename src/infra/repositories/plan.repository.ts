import { Injectable } from "@nestjs/common"
import { Client } from "../../domain/entities/client.entity"
import { PrismaClient } from "@prisma/client"
import { Plan } from "src/domain/entities/plan.entity"

export interface IPlanRepository {
  
  findAll(): Promise<Plan[]>
}

@Injectable()
export class PlanPrismaRepository implements IPlanRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Plan[]> {
  return await this.prisma.plan.findMany();
}
}