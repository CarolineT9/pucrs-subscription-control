import { Injectable } from "@nestjs/common"
import { Client } from "../../domain/entities/client.entity"
import { PrismaClient } from "@prisma/client"

export interface IClientRepository {
  create(client: Client): Promise<void>
  findAll(): Promise<Client[]>
}

@Injectable()
export class ClientPrismaRepository implements IClientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(client: Client): Promise<void> {
  await this.prisma.client.create({
    data: {
      nome: client.nome,
      email: client.email,
      // cod: client.cod, // só inclua se quiser
    }
  })
}

  async findAll(): Promise<Client[]> {
    return await this.prisma.client.findMany()
  }
}