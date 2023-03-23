import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      ID: productId,
    });
  }

  async create({ createProductInput }) {
    return await this.productRepository.save({
      ...createProductInput,
    });
  }

  async update({ productId, updateProductInput }) {
    const targetProduct = await this.findOne({ productId });
    return await this.productRepository.save({
      ...targetProduct,
      ...updateProductInput,
    });
  }
}
