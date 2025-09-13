import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DateFormatInterceptor } from './interface/interceptors/date-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// Add this import to fix the process error
import * as process from 'process';

async function bootstrap() {
  // Criar aplicação HTTP
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new DateFormatInterceptor());

  // Configurar como microsserviço para consumir eventos
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'gestao_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Controle de Assinaturas')
    .setDescription('API para gerenciamento de assinaturas, planos e clientes')
    .setVersion('1.0')
    .addTag('assinaturas')
    .addTag('planos')
    .addTag('clientes')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Iniciar microsserviços
  await app.startAllMicroservices();

  const port = process.env.PORT ?? 3000; 
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Documentação Swagger disponível em: http://localhost:${port}/api`);
  console.log('ServicoGestao configurado para consumir eventos via RabbitMQ');
}
bootstrap();
