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

  async create({ name }) {
    return await this.categoryRepository.save({
      NAME: name,
    });
  }

  async findAll() {
    return await this.categoryRepository.find();
  }
}
