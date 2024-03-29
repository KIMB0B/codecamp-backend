import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }

  @Query(() => [Category])
  fetchCategories() {
    return this.categoryService.findAll();
  }
}
