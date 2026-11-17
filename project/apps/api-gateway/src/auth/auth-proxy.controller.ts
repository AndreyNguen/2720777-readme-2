import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoginGatewayDto } from './dto/signin.dto';
import { RegisterGatewayDto } from './dto/signup.dto';

@ApiTags('Auth & Users')
@Controller()
export class AuthProxyController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post('auth/register')
  @ApiOperation({})
  async register(@Body() dto: RegisterGatewayDto) {
    const url = `${this.configService.get('USER_SERVICE_URL')}/auth/register`;
    const { data } = await firstValueFrom(this.httpService.post(url, dto));
    return data;
  }

  @Post('auth/login')
  @ApiOperation({})
  async login(@Body() dto: LoginGatewayDto) {
    const url = `${this.configService.get('USER_SERVICE_URL')}/auth/login`;
    const { data } = await firstValueFrom(this.httpService.post(url, dto));
    return data;
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({})
  async findUser(@Param('id') id: string) {
    const url = `${this.configService.get('USER_SERVICE_URL')}/users/${id}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }
}
