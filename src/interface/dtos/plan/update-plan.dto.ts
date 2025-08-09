import { PartialType } from '@nestjs/mapped-types';

import { IsNumber, IsPositive } from 'class-validator';

class _UpdatePlaDto{
  @IsNumber()
  @IsPositive()
  custoMensal: number
}
export class UpdatePlanDto extends PartialType(_UpdatePlaDto) {}
