import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DateFormatInterceptor } from './interface/interceptors/date-format.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new DateFormatInterceptor());
  
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
  
  const port = process.env.PORT ?? 3000; 
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
  console.log(`Documentação Swagger disponível em: http://localhost:${port}/api`);
}
bootstrap();
