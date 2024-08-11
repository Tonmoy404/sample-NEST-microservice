import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Here is creating client for the user and the products services *-*
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('Gateway is running on the port => 3000');
}
bootstrap();
