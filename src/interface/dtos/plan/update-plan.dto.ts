import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

class _UpdatePlaDto{
  @ApiProperty({
    description: 'Custo mensal do plano',
    example: 59.90,
    required: true
  })
  @IsNumber()
  @IsPositive()
  custoMensal: number
}
export class UpdatePlanDto extends PartialType(_UpdatePlaDto) {}
