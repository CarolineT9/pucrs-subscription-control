import { Module } from '@nestjs/common';
import { FaturamentoController } from './interface/controllers/faturamento.controller';
import { FaturamentoService } from './domain/services/faturamento.service';
import { RabbitMQModule } from '../../infra/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  controllers: [FaturamentoController],
  providers: [FaturamentoService],
})
export class FaturamentoModule {}