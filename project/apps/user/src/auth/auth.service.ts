import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    return this.userService.create(dto);
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isValid = await this.userService.comparePassword(
      dto.password,
      user.passwordHash,
    );
    if (!isValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return user;
  }
}
