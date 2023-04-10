import { Resolver } from '@nestjs/graphql';
import { ProductStateService } from './productState.service';

@Resolver()
export class ProductStateResolver {
  constructor(private readonly productStateService: ProductStateService) {}
}
