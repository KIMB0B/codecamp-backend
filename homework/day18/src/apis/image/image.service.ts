import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product_State } from '../productState/entities/productState.entity';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    @InjectRepository(Product_State)
    private readonly productStateRepository: Repository<Product_State>,
  ) {}

  imageRelations = [
    'PRODUCTSTATE',
    'PRODUCTSTATE.PRODUCT',
    'PRODUCTSTATE.PRODUCT.CATEGORY',
    'PRODUCTSTATE.PRODUCT.PRODUCTSTATE',
    'PRODUCTSTATE.PRODUCT.PRODUCTSTATE.STATE',
    'PRODUCTSTATE.STATE',
  ];

  async findAll() {
    return await this.imageRepository.find({
      relations: this.imageRelations,
    });
  }

  async findById({ imageId }) {
    return await this.imageRepository.findOne({
      where: { ID: imageId },
      relations: this.imageRelations,
    });
  }

  async findByProductId({ productId }) {
    return await this.imageRepository.find({
      where: { PRODUCTSTATE: { PRODUCT: { ID: productId } } },
      relations: this.imageRelations,
    });
  }

  async findByStateId({ stateId }) {
    return await this.imageRepository.find({
      where: { PRODUCTSTATE: { STATE: { ID: stateId } } },
      relations: this.imageRelations,
    });
  }

  async findByProductStateId({ productId, stateId }) {
    return await this.imageRepository.find({
      where: {
        PRODUCTSTATE: { PRODUCT: { ID: productId }, STATE: { ID: stateId } },
      },
      relations: this.imageRelations,
    });
  }

  async findAllWithDeleted() {
    return await this.imageRepository.find({
      withDeleted: true,
      relations: this.imageRelations,
    });
  }

  async create({ productId, stateId, createImageInput }) {
    const productState = await this.productStateRepository.findOne({
      where: { PRODUCT: productId, STATE: stateId },
      relations: ['PRODUCT', 'STATE'],
    });

    const result = await this.imageRepository.save({
      PRODUCTSTATE: productState,
      ...createImageInput,
    });

    return await this.imageRepository.findOne({
      where: { ID: result.ID },
      relations: this.imageRelations,
    });
  }

  async update({ imageId, updateImageInput }) {
    const targetImage = await this.imageRepository.findOne({
      where: { ID: imageId },
    });

    await this.imageRepository.save({
      ...targetImage,
      ...updateImageInput,
    });

    return await this.imageRepository.findOne({
      where: {
        ID: imageId,
      },
      relations: this.imageRelations,
    });
  }

  async delete({ imageId }) {
    const result = await this.imageRepository.softDelete({ ID: imageId });
    return result.affected ? true : false;
  }

  async restore({ imageId }) {
    const result = await this.imageRepository.restore({ ID: imageId });
    return result.affected ? true : false;
  }
}
