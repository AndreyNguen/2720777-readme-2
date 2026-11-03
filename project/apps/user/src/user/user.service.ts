import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@project/shared/app/types';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/create-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getHash(password: string) {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async create(dto: CreateUserDto) {
    const passwordHash = await this.getHash(dto.password);

    return this.userRepository.createUser({
      email: dto.email,
      name: dto.name,
      role: UserRole.User,
      passwordHash,
    });
  }

  findById(id: string) {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
