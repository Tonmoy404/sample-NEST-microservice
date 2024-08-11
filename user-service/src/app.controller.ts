import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return [
      {
        id: 1,
        name: 'Tonmoy',
      },
      {
        id: 2,
        name: 'Rifat',
      },
      {
        id: 3,
        name: 'Rabby',
      },
    ];
  }
}
