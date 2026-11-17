import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/interfaces/jwt-payload.interface';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({})
  getMe(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({ status: 200, type: UserRdo })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return plainToInstance(UserRdo, user, { excludeExtraneousValues: true });
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({})
  @ApiResponse({ status: 200, description: 'Пароль успешно изменен' })
  async changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(user.id, dto);
  }
}
