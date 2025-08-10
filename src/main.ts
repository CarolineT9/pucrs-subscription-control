import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DateFormatInterceptor } from './interface/interceptors/date-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new DateFormatInterceptor());
  const port = process.env.PORT ?? 3000; 
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();
