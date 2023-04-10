import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product_State } from './entities/productState.entity';

@Injectable()
export class ProductStateService {
  constructor(
    @InjectRepository(Product_State)
    private readonly productStateRepository: Repository<Product_State>,
  ) {}
}
