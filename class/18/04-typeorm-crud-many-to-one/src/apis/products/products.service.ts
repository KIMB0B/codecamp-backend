import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepositoy: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // return await this.productRepository.save({
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    //   ...createProductInput,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const productSaleslocationResult =
      await this.productSaleslocationRepositoy.save({
        ...productSaleslocation,
      });

    return await this.productRepository.save({
      ...product,
      productSaleslocation: productSaleslocationResult,
      productCategory: {
        id: productCategoryId,
      },
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

  async delete({ productId }) {
    // 1. 실제 삭제
    // this.productRepository.delete({ id: productId });

    // 2. 소프트 삭제(직접 구현) - isDeleted // entity에서 boolean 형식 열 추가
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접 구현) - deletedAt // entity에서 date 형식 열 추가
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove // entity에서 @DeleteDateColumn 열 추가, id로만 삭제 가능
    // this.productRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(TypeORM 제공) - sofeDelete // id뿐 아니라 다른 기준으로도 삭제 가능
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
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
