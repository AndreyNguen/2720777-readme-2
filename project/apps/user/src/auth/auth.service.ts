import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(dto: CreateUserDto) {
    const existing = this.userService.findByEmail(dto.email);
    if (existing) {
      throw new Error('Пользователь уже существует');
    }

    return this.userService.create(dto);
  }

  validateUser(dto: LoginUserDto) {
    const user = this.userService.findByEmail(dto.email);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const isValid = this.userService.comparePassword(
      dto.password,
      user.passwordHash,
    );
    if (!isValid) {
      throw new Error('Неверный email или пароль');
    }

    return user;
  }
}
