import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly configService: ConfigService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  async findAllProducts() {
    return this.productRepo.find();
  }

  async findOneProduct(id: number) {
    const product = await this.productRepo.find({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return product;
  }

  async updateProduct(id: number, updatedProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepo.find({ where: { id } });
    if (!productToUpdate) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(productToUpdate, updatedProductDto);

    return productToUpdate;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.find({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.productRepo.remove(product);
  }
}
