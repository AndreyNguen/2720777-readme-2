import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import { UserRdo } from '../user/rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({})
  register(@Body() dto: CreateUserDto) {
    const user = this.authService.register(dto);
    return plainToInstance(UserRdo, user, { excludeExtraneousValues: true });
  }

  @Post('login')
  @ApiOperation({})
  login(@Body() dto: LoginUserDto) {
    const user = this.authService.validateUser(dto);
    return plainToInstance(UserRdo, user, { excludeExtraneousValues: true });
  }
}
