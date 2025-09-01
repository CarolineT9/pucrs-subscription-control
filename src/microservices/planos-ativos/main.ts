import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PlanosAtivosModule } from './planos-ativos.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PlanosAtivosModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'planos_ativos_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  
  await app.listen();
  console.log('Microsserviço de Planos Ativos está ouvindo');
}

bootstrap();