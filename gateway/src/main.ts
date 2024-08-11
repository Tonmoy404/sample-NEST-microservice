import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Here is creating client for the user and the products services *-*
  const userService = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  });

  const productService = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });

  app.enableCors();
  await app.listen(3000);
  console.log('Gateway is running on the port => 3000');

  const users = await firstValueFrom(
    userService.send({ cmd: 'get_users' }, {}),
  );
  console.log('The Users List --> \n', users);

  const products = await firstValueFrom(
    productService.send({ cmd: 'get_products' }, {}),
  );
  console.log('The Products list --> \n', products);
}
bootstrap();
