import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva'
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@email.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
