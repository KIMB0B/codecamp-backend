import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product_State } from '../productState/entities/productState.entity';
import { Detail } from './entities/detail.entity';

@Injectable()
export class DetailService {
  constructor(
    @InjectRepository(Detail)
    private readonly detailRepository: Repository<Detail>,

    @InjectRepository(Product_State)
    private readonly productStateRepository: Repository<Product_State>,
  ) {}

  detailRelations = [
    'PRODUCTSTATE',
    'PRODUCTSTATE.PRODUCT',
    'PRODUCTSTATE.PRODUCT.CATEGORY',
    'PRODUCTSTATE.PRODUCT.STATES',
    'PRODUCTSTATE.STATE',
  ];

  async findAll() {
    return this.detailRepository.find({
      relations: this.detailRelations,
    });
  }

  async findById({ detailId }) {
    return await this.detailRepository.findOne({
      where: { ID: detailId },
      relations: this.detailRelations,
    });
  }

  async findByProductId({ productId }) {
    return await this.detailRepository.find({
      where: { PRODUCTSTATE: { PRODUCT: { ID: productId } } },
      relations: this.detailRelations,
    });
  }

  async findByStateId({ stateId }) {
    return await this.detailRepository.find({
      where: { PRODUCTSTATE: { STATE: { ID: stateId } } },
      relations: this.detailRelations,
    });
  }

  async findByProductStateId({ productId, stateId }) {
    return await this.detailRepository.findOne({
      where: {
        PRODUCTSTATE: { PRODUCT: { ID: productId }, STATE: { ID: stateId } },
      },
      relations: this.detailRelations,
    });
  }

  async findAllWithDeleted() {
    return await this.detailRepository.find({
      withDeleted: true,
      relations: this.detailRelations,
    });
  }

  async create({ productId, stateId, createDetailInput }) {
    const productState = await this.productStateRepository.findOne({
      where: { PRODUCT: productId, STATE: stateId },
      relations: ['PRODUCT', 'STATE'],
    });

    const result = await this.detailRepository.save({
      PRODUCTSTATE: productState,
      ...createDetailInput,
    });

    return await this.detailRepository.findOne({
      where: { ID: result.ID },
      relations: this.detailRelations,
    });
  }

  async update({ detailId, updateDetailInput }) {
    const targetImage = await this.detailRepository.findOne({
      where: { ID: detailId },
    });

    await this.detailRepository.save({
      ...targetImage,
      ...updateDetailInput,
    });

    return await this.detailRepository.findOne({
      where: {
        ID: detailId,
      },
      relations: this.detailRelations,
    });
  }

  async delete({ detailId }) {
    const result = await this.detailRepository.softDelete({ ID: detailId });
    return result.affected ? true : false;
  }

  async restore({ detailId }) {
    const result = await this.detailRepository.restore({ ID: detailId });
    return result.affected ? true : false;
  }
}
