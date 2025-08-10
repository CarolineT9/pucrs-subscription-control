

import { IsString, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  codCli: string;

  @IsString()
  @IsNotEmpty()
  codPlano: string;

  @IsNotEmpty()
  inicioFidelidade: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @IsNotEmpty()
  fimFidelidade: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @IsNotEmpty()
  dataUltimoPagamento: string | Date; // Aceita string no formato YYYY/MM/DD HH:MM ou objeto Date

  @IsNumber()
  @IsNotEmpty()
  custoFinal: number;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}
