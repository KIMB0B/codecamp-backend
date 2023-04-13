import { InputType, PartialType } from '@nestjs/graphql';
import { CreateDetailInput } from './createDetail.input';

@InputType()
export class UpdateDetailInput extends PartialType(CreateDetailInput) {}
