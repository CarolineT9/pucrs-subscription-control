

import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'UUID do cliente',
    example: '9c27a3d8-3431-4484-a2f5-8f9aee9d0972'
  })
  @IsString()
  @IsNotEmpty()
  codCli: string;

  @ApiProperty({
    description: 'UUID do plano',
    example: '6d4c66f5-6a1d-4a9a-a9c2-0a7f6d9a5c1a'
  })
  @IsString()
  @IsNotEmpty()
  codPlano: string;

  @ApiProperty({
    description: 'Data de início da fidelidade no formato YYYY/MM/DD HH:MM',
    example: '2023/01/01 10:00'
  })
  @IsNotEmpty()
  inicioFidelidade: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @ApiProperty({
    description: 'Data de fim da fidelidade no formato YYYY/MM/DD HH:MM',
    example: '2025/01/30 12:00'
  })
  @IsNotEmpty()
  fimFidelidade: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @ApiProperty({
    description: 'Data do último pagamento no formato YYYY/MM/DD HH:MM',
    example: '2023/12/15 08:30'
  })
  @IsNotEmpty()
  dataUltimoPagamento: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @ApiProperty({
    description: 'Custo final da assinatura',
    example: 99.90
  })
  @IsNumber()
  @IsNotEmpty()
  custoFinal: number;

  @ApiProperty({
    description: 'Descrição da assinatura',
    example: 'Assinatura Premium'
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
