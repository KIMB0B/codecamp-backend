import { InputType, OmitType } from '@nestjs/graphql';
import { Detail } from '../entities/detail.entity';

@InputType()
export class CreateDetailInput extends OmitType(
  Detail,
  ['ID', 'PRODUCTSTATE'],
  InputType,
) {}
