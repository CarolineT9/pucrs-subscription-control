import { IsInt, IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

export class PagamentoDto {
  @IsInt()
  @Min(1)
  @Max(31)
  dia: number;

  @IsInt()
  @Min(1)
  @Max(12)
  mes: number;

  @IsInt()
  @Min(2000)
  ano: number;

  @IsString()
  codAssinatura: string;

  @IsNumber()
  @IsPositive()
  valorPago: number;
}