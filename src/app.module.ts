import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './domain/modules/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './domain/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:'memory',
      entities: [Client],
      synchronize: true
    }),
    ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
