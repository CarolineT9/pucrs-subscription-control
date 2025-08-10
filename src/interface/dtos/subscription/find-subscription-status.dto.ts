// interface/dtos/subscription-status.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionStatusDto {
  @ApiProperty({ description: 'UUID da assinatura', example: '8f7e6d5c-4b3a-2c1d-0e9f-8a7b6c5d4e3f' })
  codSubscription: string;

  @ApiProperty({ description: 'UUID do cliente', example: '9c27a3d8-3431-4484-a2f5-8f9aee9d0972' })
  codCli: string;

  @ApiProperty({ description: 'UUID do plano', example: '6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a' })
  codPlano: string;

  @ApiProperty({ description: 'Data de início da fidelidade', example: '2023-01-01T10:00:00.000Z' })
  inicioFidelidade: Date;

  @ApiProperty({ description: 'Data de fim da fidelidade', example: '2025-01-30T12:00:00.000Z' })
  fimFidelidade: Date;

  @ApiProperty({ description: 'Data do último pagamento', example: '2023-12-15T08:30:00.000Z' })
  dataUltimoPagamento: Date;

  @ApiProperty({ description: 'Custo final da assinatura', example: 99.90 })
  custoFinal: number;

  @ApiProperty({ description: 'Descrição da assinatura', example: 'Assinatura Premium' })
  descricao: string;

  @ApiProperty({ description: 'Status da assinatura', enum: ['ativa', 'cancelada'], example: 'ativa' })
  status: 'ativa' | 'cancelada';
}
