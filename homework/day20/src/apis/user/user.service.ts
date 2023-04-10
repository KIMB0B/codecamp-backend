import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneWithEmail({ EMAIL }) {
    return await this.userRepository.findOne({ where: { EMAIL: EMAIL } });
  }

  async findOneWithDeleted({ EMAIL }) {
    return await this.userRepository.findOne({
      withDeleted: true,
      where: { EMAIL: EMAIL },
    });
  }

  async create({ EMAIL, HashedPassword: PASSWORD, NAME, AGE }) {
    const user = await this.userRepository.findOne({ where: { EMAIL: EMAIL } });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    return await this.userRepository.save({ EMAIL, PASSWORD, NAME, AGE });
  }

  async update({ EMAIL, HashedPassword: PASSWORD }) {
    const result = await this.userRepository.update(
      { EMAIL: EMAIL },
      { PASSWORD: PASSWORD },
    );
    return result.affected ? true : false;
  }

  async delete({ EMAIL }) {
    const result = await this.userRepository.softDelete({ EMAIL: EMAIL });
    return result.affected ? true : false;
  }

  async restore({ EMAIL }) {
    const result = await this.userRepository.restore({ EMAIL: EMAIL });
    return result.affected ? true : false;
  }
}
