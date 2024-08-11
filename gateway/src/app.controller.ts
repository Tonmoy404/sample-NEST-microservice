import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Controller('api')
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  USER_API_URL = `http://localhost:3001/users`;
  PRODUCT_API_URL = `http://localhost:3001/products`;

  @Get('users')
  async getUsers() {
    const response = await lastValueFrom(
      this.httpService.get(this.USER_API_URL),
    );
    return response.data;
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.USER_API_URL}/${id}`),
    );
    return response.data;
  }

  @Post('users')
  async createUser(@Body() userData: any) {
    const response = await lastValueFrom(
      this.httpService.post(this.USER_API_URL, userData),
    );
    return response.data;
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: any,
  ) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.USER_API_URL}/${id}`, userData),
    );

    return response.data;
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.USER_API_URL}/${id}`),
    );

    return response.data;
  }

  @Get('products')
  async getProducts() {
    const response = await lastValueFrom(
      this.httpService.get(this.PRODUCT_API_URL),
    );
    return response.data;
  }

  @Get('products/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    const response = await lastValueFrom(
      this.httpService.get(`${this.PRODUCT_API_URL}/${id}`),
    );
    return response.data;
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    const response = await lastValueFrom(
      this.httpService.post(this.PRODUCT_API_URL, productData),
    );
    return response.data;
  }

  @Patch('products/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: any,
  ) {
    const response = await lastValueFrom(
      this.httpService.patch(`${this.PRODUCT_API_URL}/${id}`, productData),
    );

    return response.data;
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const response = await lastValueFrom(
      this.httpService.delete(`${this.PRODUCT_API_URL}/${id}`),
    );

    return response.data;
  }
}
