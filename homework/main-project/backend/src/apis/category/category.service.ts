import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findById({ categoryId }) {
    return await this.categoryRepository.findOne({
      where: { ID: categoryId },
    });
  }

  async findByName({ name }) {
    return await this.categoryRepository.findOne({
      where: { NAME: name },
    });
  }

  async findAllWithDeleted() {
    return await this.categoryRepository.find({ withDeleted: true });
  }

  async create({ name }) {
    return await this.categoryRepository.save({
      NAME: name,
    });
  }

  async update({ categoryId, name }) {
    return await this.categoryRepository.save({
      ID: categoryId,
      NAME: name,
    });
  }

  async delete({ categoryId }) {
    const result = await this.categoryRepository.softDelete({ ID: categoryId });
    return result.affected ? true : false;
  }

  async restore({ categoryId }) {
    const result = await this.categoryRepository.restore({ ID: categoryId });
    return result.affected ? true : false;
  }
}
