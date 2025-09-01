import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FaturamentoModule } from './faturamento.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FaturamentoModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'faturamento_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  
  await app.listen();
  console.log('Microsserviço de Faturamento está ouvindo');
}

bootstrap();