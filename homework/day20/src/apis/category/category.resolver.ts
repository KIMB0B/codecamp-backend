import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  fetchCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  fetchCategory(@Args('categoryId') categoryId: string) {
    return this.categoryService.findById({ categoryId });
  }

  @Query(() => Category)
  fetchCategoryByName(@Args('name') name: string) {
    return this.categoryService.findByName({ name });
  }

  @Query(() => [Category])
  fetchCategoryWithDeleted() {
    return this.categoryService.findAllWithDeleted();
  }

  @Mutation(() => Category)
  createCategory(@Args('name') name: string) {
    return this.categoryService.create({ name });
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('categoryId') categoryId: string,
    @Args('name') name: string,
  ) {
    return this.categoryService.update({ categoryId, name });
  }

  @Mutation(() => Boolean)
  deleteCategory(@Args('categoryId') categoryId: string) {
    return this.categoryService.delete({ categoryId });
  }

  @Mutation(() => Boolean)
  restoreCategory(@Args('categoryId') categoryId: string) {
    return this.categoryService.restore({ categoryId });
  }
}
