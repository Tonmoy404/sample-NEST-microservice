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
  PRODUCT_API_URL = `http://localhost:3002/products`;

  @Get('users')
  async getUsers() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(this.USER_API_URL),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.USER_API_URL}/${id}`),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Post('users')
  async createUser(@Body() userData: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.USER_API_URL, userData),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: any,
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.patch(`${this.USER_API_URL}/${id}`, userData),
      );

      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(`${this.USER_API_URL}/${id}`),
      );

      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Get('products')
  async getProducts() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(this.PRODUCT_API_URL),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Get('products/:id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${this.PRODUCT_API_URL}/${id}`),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Post('products')
  async createProduct(@Body() productData: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.PRODUCT_API_URL, productData),
      );
      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Patch('products/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: any,
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.patch(`${this.PRODUCT_API_URL}/${id}`, productData),
      );

      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await lastValueFrom(
        this.httpService.delete(`${this.PRODUCT_API_URL}/${id}`),
      );

      return response.data;
    } catch (err) {
      console.log('An Error Occurred --> ', err);
    }
  }
}
