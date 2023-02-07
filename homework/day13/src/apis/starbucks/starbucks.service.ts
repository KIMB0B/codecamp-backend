import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarbucksInput } from './dto/starbucks.input';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  constructor(
    @InjectRepository(Starbucks)
    private readonly starbucksRepository: Repository<Starbucks>,
  ) {}

  async create(starbucksInput: StarbucksInput): Promise<Starbucks> {
    const starbucks = new Starbucks();
    starbucks.name = starbucksInput.name;
    starbucks.price = starbucksInput.price;
    starbucks.servingSize = starbucksInput.servingSize;
    starbucks.saturatedFat = starbucksInput.saturatedFat;
    starbucks.protein = starbucksInput.protein;
    starbucks.natrium = starbucksInput.natrium;
    starbucks.sugar = starbucksInput.sugar;
    starbucks.caffeine = starbucksInput.caffeine;

    return this.starbucksRepository.save(starbucks);
  }

  async findAll(): Promise<Starbucks[]> {
    return this.starbucksRepository.find();
  }
}
