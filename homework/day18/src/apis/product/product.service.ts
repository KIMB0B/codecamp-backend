import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Product_State } from '../productState/entities/productState.entity';
import { State } from '../state/entities/state.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,

    @InjectRepository(Product_State)
    private readonly productStateRepository: Repository<Product_State>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['CATEGORY', 'PRODUCTSTATE', 'STATES'],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { ID: productId },
      relations: ['CATEGORY', 'PRODUCTSTATE', 'STATES'],
    });
  }

  async findAllWithDeleted() {
    return await this.productRepository.find({
      withDeleted: true,
      relations: ['CATEGORY', 'PRODUCTSTATE', 'STATES'],
    });
  }

  async create({ createProductInput }) {
    const targetCategory = await this.categoryRepository.findOne({
      where: { ID: createProductInput.CATEGORYID },
    });

    const targetStates = await this.stateRepository.findByIds(
      createProductInput.STATES,
    );

    if (targetStates.length !== createProductInput.STATES.length) {
      throw new Error('존재하지 않는 STATE가 있습니다.');
    }

    const productResult = await this.productRepository.save({
      ...createProductInput,
      CATEGORY: targetCategory,
      STATES: targetStates,
    });

    for (const state of targetStates) {
      await this.productStateRepository.save({
        PRODUCT: productResult,
        STATE: state,
      });
    }

    return productResult;
  }

  async update({ productId, updateProductInput }) {
    if (updateProductInput.STATES) {
      const targetStates = await this.stateRepository.findByIds(
        updateProductInput.STATES,
      );

      if (targetStates.length !== updateProductInput.STATES.length) {
        throw new Error('존재하지 않는 STATE가 있습니다.');
      }

      await this.productStateRepository.softDelete({ PRODUCT: productId });

      for (const state of targetStates) {
        const targetProductState = await this.productStateRepository.findOne(
          { PRODUCT: productId, STATE: state },
          { withDeleted: true },
        );

        if (targetProductState) {
          await this.productStateRepository.restore({
            PRODUCT: productId,
            STATE: state,
          });
        } else {
          await this.productStateRepository.save({
            PRODUCT: productId,
            STATE: state,
          });
        }
      }

      await this.productRepository.save({
        ID: productId,
        ...updateProductInput,
        STATES: targetStates,
      });
    } else {
      await this.productRepository.save({
        ID: productId,
        ...updateProductInput,
      });
    }

    return this.productRepository.findOne({
      where: { ID: productId },
      relations: ['CATEGORY', 'PRODUCTSTATE', 'STATES'],
    });
  }

  async delete({ productId }) {
    await this.productStateRepository.softDelete({ PRODUCT: productId });
    const result = await this.productRepository.softDelete({ ID: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    await this.productStateRepository.restore({ PRODUCT: productId });
    const result = await this.productRepository.restore({ ID: productId });
    return result.affected ? true : false;
  }
}
