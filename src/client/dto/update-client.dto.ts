import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

class _UpdateClientDto{
  //variaveis que posso atualizar
  nome: string;
  email: string;
}

export class UpdateClientDto extends PartialType(_UpdateClientDto) {
  
}
