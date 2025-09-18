import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import RequestWithUser from '../auth/types/request-with-user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
