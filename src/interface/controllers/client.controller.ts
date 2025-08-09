import { FindAllClientUseCase } from '../../application/uses-cases/find-all.use-case';
import { CreateClientUseCase } from '../../application/uses-cases/create-client.use-case';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateClientDto } from '../dtos/client/create-client.dto';


@Controller('client')
export class ClientController {
  constructor(
    
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly findAllClientUseCase: FindAllClientUseCase
  
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.createClientUseCase.execute(createClientDto);
  }

  @Get()
  findAll() {
    return this.findAllClientUseCase.execute();
  }

  // @Get(':cod')
  // findOne(@Param('cod') cod: string) {
  //   return this.clientService.findOne(cod);
  // }

  // @Patch(':cod')
  // update(@Param('cod') cod: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientService.update(cod, updateClientDto);
  // }

  // @Delete(':cod')
  // remove(@Param('cod') cod: string) {
  //   return this.clientService.remove(cod);
  // }
}
