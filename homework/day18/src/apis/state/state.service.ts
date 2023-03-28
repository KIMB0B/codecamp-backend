import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAll() {
    return await this.stateRepository.find();
  }

  async findById({ stateId }) {
    return await this.stateRepository.findOne({ where: { ID: stateId } });
  }

  async findByName({ name }) {
    return await this.stateRepository.findOne({ where: { NAME: name } });
  }

  async findAllWithDeleted() {
    return await this.stateRepository.find({ withDeleted: true });
  }

  async create({ name }) {
    return await this.stateRepository.save({ NAME: name });
  }

  async update({ stateId, name }) {
    return await this.stateRepository.save({
      ID: stateId,
      NAME: name,
    });
  }

  async delete({ stateId }) {
    const result = await this.stateRepository.softDelete({ ID: stateId });
    return result.affected ? true : false;
  }

  async restore({ stateId }) {
    const result = await this.stateRepository.restore({ ID: stateId });
    return result.affected ? true : false;
  }
}
