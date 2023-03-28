import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateImageInput } from './dto/createImage.input';
import { UpdateImageInput } from './dto/updateImage.input';
import { Image } from './entities/image.entity';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Query(() => [Image])
  fetchImages() {
    return this.imageService.findAll();
  }

  @Query(() => Image)
  fetchImage(@Args('imageId') imageId: string) {
    return this.imageService.findById({ imageId });
  }

  @Query(() => [Image])
  fetchImagesByProductId(@Args('productId') productId: string) {
    return this.imageService.findByProductId({ productId });
  }

  @Query(() => [Image])
  fetchImagesByStateId(@Args('stateId') stateId: string) {
    return this.imageService.findByStateId({ stateId });
  }

  @Query(() => [Image])
  fetchImagesByProductStateId(
    @Args('productId') productId: string,
    @Args('stateId') stateId: string,
  ) {
    return this.imageService.findByProductStateId({ productId, stateId });
  }

  @Query(() => [Image])
  fetchImagesWithDeleted() {
    return this.imageService.findAllWithDeleted();
  }

  @Mutation(() => Image)
  createImage(
    @Args('productId') productId: string,
    @Args('stateId') stateId: string,
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    return this.imageService.create({ productId, stateId, createImageInput });
  }

  @Mutation(() => Image)
  updateImage(
    @Args('imageId') imageId: string,
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
  ) {
    return this.imageService.update({ imageId, updateImageInput });
  }

  @Mutation(() => Boolean)
  imageDelete(@Args('imageId') imageId: string) {
    return this.imageService.delete({ imageId });
  }

  @Mutation(() => Boolean)
  imageRestore(@Args('imageId') imageId: string) {
    return this.imageService.restore({ imageId });
  }
}
