import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS para facilitar o desenvolvimento
  const port = process.env.PORT ?? 3000; // Mudando para porta 3001
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();
