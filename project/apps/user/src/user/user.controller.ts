import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserService } from './user.service';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    type: UserRdo,
  })
  @ApiResponse({})
  findById(@Param('id') id: string) {
    const user = this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return plainToInstance(UserRdo, user, { excludeExtraneousValues: true });
  }
}
