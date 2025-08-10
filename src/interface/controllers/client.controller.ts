import { FindAllClientUseCase } from '../../application/uses-cases/client/find-all.use-case';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateClientDto } from '../dtos/client/create-client.dto';


@ApiTags('clientes')
@Controller('client')
export class ClientController {
  constructor(
    
    
    private readonly findAllClientUseCase: FindAllClientUseCase
  
  ) {}

  // @Post()
  // create(@Body() createClientDto: CreateClientDto) {
  //   return this.createClientUseCase.execute(createClientDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso' })
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
