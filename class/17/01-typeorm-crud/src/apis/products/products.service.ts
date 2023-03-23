import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    return await this.productRepository.save({
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
      ...createProductInput,
    });
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    return await this.productRepository.save({
      ...myproduct,
      ...updateProductInput,
    });
  }

  async checkSoldout({ productId }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (myproduct.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }
}
