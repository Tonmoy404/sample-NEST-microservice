import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductController {
  @MessagePattern({ cmd: 'get_products' })
  getProducts() {
    return [
      {
        id: 101,
        name: 'Lenovo',
      },
      {
        id: 102,
        name: 'HP',
      },
      {
        id: 103,
        name: 'ASUS',
      },
    ];
  }
}
